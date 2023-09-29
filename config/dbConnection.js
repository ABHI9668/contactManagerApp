const mongoose=require("mongoose");

const connectdb=async()=>{

    try{
       const connect=await mongoose.connect(process.env.CONNECTION_STRING)
      
    }
    catch(err){
       
        process.exit(1);
        
    }
}
module.exports=connectdb;