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
        res.json({message:"user register successfully"});
    } catch (error) {
        res.json({message:error.message})
        console.log(error)
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            res.status(400).json({message:"User does not exist"});
        }
        const loginUser=User.findOne({email:email,password:password});
        if(loginUser){
            res.status(200).json({message:"User login successfully"});
        }
    } catch (error) {
        console.log(error)
    }
}