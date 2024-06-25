const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/inotebook";
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