const { default: mongoose } = require("mongoose")
const mongoose=require("mongoose")

const contactSchema=mongoose.Schema({
   name:{
    type:String,
    requires:[true,"Please enter the contact name"],
   },
   email:{
    type:String,
    requires:[true,"Please enter the contact email address"],
   },
   email:{
    type:String,
    requires:[true,"Please enter the contact phone number"],
   }
    
},{
    timestamps:true
})
module.exports=mongoose.model("Contact",contactSchema)