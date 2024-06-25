const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt=require('bcrypt');
const { body, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
const getuser=require('../middlewares/getuser');
const JWT_SECRET="Shubhamisagoodboy";

//API request for creating new user
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry! user already exists" });
      }
      const salt=await bcrypt.genSalt(10);
      const saltPassword=await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        password: saltPassword,
        email: req.body.email,
      });
      const data={
        user:{
            id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);

      success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Error happened");
    }
  }
);


//API request for login for already existing users
router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password must be atleast 5 characters").exists(),
    ],
    async (req, res) => {
      let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {email,password}=req.body;
      try {
        let user = await User.findOne({email});
        if (!user) {
          success=false;
          return res.status(400).json({ error: "Please enter correct credentials" });
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({error:"Please enter correct credentials"});
        }
        const data={
          user:{
              id:user.id
          }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Error happened");
      }
    }
  );

//Get logged in user details
router.post("/getuser",getuser,async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Error happened");
      }
    }
  );


module.exports = router;
