import User from "../models/user.model.js";

export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        // console.log(name,email,password)
        const existedUser=await User.findOne({email:email});
        if(existedUser){
            return res.status(400).json({message:"User already existed"});
        }
        const newUser= User({name:name,email:email,password:password});
        await newUser.save();
        res.json({name,email});
    } catch (error) {
        res.json({message:error.message})
        console.log(error)
    }
}

export const login=(req,res)=>{
    try {
        res.json("Login Page");
    } catch (error) {
        console.log(error)
    }
}