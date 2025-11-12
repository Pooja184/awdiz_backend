import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExistForOne = await User.findOne({ email: email });
    console.log(isUserExistForOne, "isUserExistForOne");
    if (isUserExistForOne) {
      return res
        .status(400)
        .json({ message: "Email already exists.", success: false });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = User({ name: name, email, password: encryptedPassword });
    // console.log(newUser, "newUser");
    await newUser.save();
    res
      .status(201)
      .json({ message: "User Registered Successfully", success: true });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "Error in Registering user", success: false });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required", success: false });
    }
    const isUserExists = await User.findOne({ email: email });
    console.log(isUserExists, "isUserExists");
    if (!isUserExists) {
      return res
        .status(404)
        .json({ message: "Email not found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExists.password
    );
    // console.log(isPasswordValid, "isPasswordValid");
    // console.log(isPasswordValid,"pass")
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid Password", success: false });
    }

    const token = jwt.sign(
      { userId: isUserExists._id },
      process.env.JWT_SECRET
    );
    console.log(token, "token");
    res.cookie("token", token, {
      httpOnly: true,
    
    });

    return res.status(200).json({
      message: "Login Successful",
      success: true,
      user: { name: isUserExists.name, userId: isUserExists._id },
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "Error in Registering user", success: false });
  }
};

export const getCurrentUser=async(req,res)=>{
    try {
        
        // const token = req.cookies.token;
    // console.log("Token from cookies:", token);
    console.log(req.userId, "req.userId");

    const isUserExists = await User.findById(req.userId);
    if (!isUserExists) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Login Successful",
      success: true,
      user: { name: isUserExists.name, userId: isUserExists._id },
    });
    } catch (error) {
        console.log(error)
    }
}