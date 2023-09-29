const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModels")

//@desc Get All Contacts
//@route GET /api/contacts
//@access public 
const getContacts=asyncHandler(async(req,resp)=>{
    const contacts=await Contact.find()
    resp.statusCode=200;
     resp.send(contacts)
})

//@desc create new Contact
//@route POST /api/contacts
//@access public 
const createContact=asyncHandler(async(req,resp)=>{
   
    const {name,email,phone}=req.body;
    if(!name || !email || !phone) {
        resp.statusCode(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone
    })
    resp.statusCode=201;
     resp.send(contact)
})

//@desc get single Contact
//@route GET /api/contact/:id
//@access public 
const getSingleContact=asyncHandler(async(req,resp)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        resp.status(400);
        throw new Error("Contact not found")
    }
    resp.status(200).json(contact)

})

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access public 
const updateContact=asyncHandler(async(req,resp)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        resp.status(400);
        throw new Error("Contact not found")
    }
    const updatedcontact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    resp.statusCode=200;
     resp.send(updatedcontact)
})

//@desc delete Contact
//@route DELETE /api/contacts/:id
//@access public 
const deleteContact=asyncHandler(async(req,resp)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        resp.status(400);
        throw new Error("Contact not found")
    }
    await Contact.remove()
    resp.statusCode=200;
     resp.send(contact)
})


module.exports={getContacts,createContact,updateContact,deleteContact,getSingleContact};