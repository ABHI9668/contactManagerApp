const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
//@desc register a user
//@route POST /api/user/register
//@access public 
const registerUser=asyncHandler(async(req, res) => {
    const{username,email,password}=req.body;
   
    if(!username || !email || !password){
        
        res.status(400);
        throw new Error("All fields are mandatory")
    }
  
    const userAvailable=await User.findOne({email})
    console.log("nice");
    if(userAvailable){
        res.status(400);
        throw new Error("user already registered")
    }
   
    //Hash Password
    const hashedPassword= await bcrypt.hash(password,10)

    const user=await User.create({
        username,
        email,
        password:hashedPassword
    })
    
    if(user){
        res.status(201).json({_id:user.id,_email:user.email})
    }else{
        res.status(400);
        throw new Error("USer data is not valid")
    }

    res.json({ message: "register the user" });
  })

  //@desc Login a user
//@route POST /api/user/login
//@access public 
const loginUser=asyncHandler(async(req, res) => {
    const{email,password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error ("All fields are mandatory")
    }
    const user=await User.findOne({email})
    if(user &&(await bcrypt.compare(password,user.hashedPassword))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },
        process.env.ACCESSTOKEN_SECRET,
        {expiresIn:"1m"}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
    
  })

   //@desc current user
//@route POST /api/user/current
//@access private
const currentUser=asyncHandler(async(req, res) => {
    res.json({ message: "current user information" });
  })

  module.exports={registerUser,loginUser,currentUser}