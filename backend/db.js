require('dotenv').config();
const mongoURI=process.env.MONGO_URL;
const mongoose=require('mongoose');

const connectToMongo=async()=>{
    try{
        mongoose.connect(mongoURI)
        console.log("Connected to mongoDB");
    }
    catch(error){
        console.log('ERRROR!!!!!!!!!');
    }
}
module.exports=connectToMongo;