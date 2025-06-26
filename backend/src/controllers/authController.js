import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";


const generateToken = (userId,res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt",token,{
      maxAge:1*24*60*60*1000,
      httpOnly:true,
      sameSite:"strict",
      secure:process.env.NODE_ENV !== "development",
  })

};


export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    generateToken(user._id,res);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    generateToken(user._id,res);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const logout = async(req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged Out Successfully"})
  } catch (err) {
    res.status(500).json({message:"Internal Server Error"})
  }
}

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateProfile=async (req,res)=>{
   try {
      const {profilePic}=req.body
      const userId = req.user._id
      
      if(!profilePic){
        return res.status(400).json({message:"Profile pic is required"})
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePic)
      const updateUser = await User.findByIdAndUpdate(
        userId,
        {profilePic:uploadResponse.secure_url},
        {new:true}
      )

      res.status(200).json(updateUser)
   } catch (error) {
    console.log("error in update",error)
    res.status(500).json({message:"Internal server error"})
   } 
}