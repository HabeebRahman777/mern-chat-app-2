import Message from "../models/Message.js"
import User from "../models/User.js"
import { getReceiverSocketId } from "../sockets/index.js"
import {io} from "../server.js"

export const getUsers = async(req,res)=>{
    try {
      const loggedInUserId=req.user._id
      const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
      res.status(200).json(filteredUsers)
    } catch (error) {
      console.log("Error in getUsers: ",error.message) 
      res.status(500).json({error:"Internal server error"}) 
    }
}

export const getFriends = async(req,res)=>{
    const {id:userId}=req.params
  try {
      const user = await User.findById(userId)
      if(!user){
        return res.status(404).json({message:"User not found"})
      }
      res.json({friends:user.friends})
  } catch (error) {
    console.error("Error fetching friend list:", error);
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getOutRequests = async(req,res)=>{
    const {id:userId}=req.params
  try {
      const user = await User.findById(userId)
      if(!user){
        return res.status(404).json({message:"User not found"})
      }
      res.json({requests:user.outgoingRequests})
  } catch (error) {
    console.error("Error fetching requests list:", error);
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getInRequests = async(req,res)=>{
    const {id:userId}=req.params
  try {
      const user = await User.findById(userId)
      if(!user){
        return res.status(404).json({message:"User not found"})
      }
      res.json({requests:user.incomingRequests})
  } catch (error) {
    console.error("Error fetching requests list:", error);
    res.status(500).json({ message: "Internal server error" })
  }
}

export const sendMessage=async(req,res)=>{
  try {
    const{text}=req.body
    const{id:receiverId}=req.params
    const senderId=req.user._id


    const newMessage = new Message({
      senderId,
      receiverId,
      text
    })

    await newMessage.save()

    const receiverSocketId=getReceiverSocketId(receiverId)
    console.log(receiverId);
    
    console.log(receiverSocketId);
    
    if(receiverId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }
    res.status(201).json(newMessage)
  } catch (error) {
    console.log("Error in sendMessage controller",error.message)
    res.status(500).json({error:"Internal server error"})
  }
}

export const getMessages=async(req,res)=>{
  try {
    const{id:userToChatId}=req.params
    const myId=req.user._id

    
    const messages=await Message.find({
      $or:[
        {senderId:myId,receiverId:userToChatId},
        {senderId:userToChatId,receiverId:myId}
      ]
    })
    
    res.status(200).json(messages)
  } catch (error) {
    console.log("Error in getMessage controller",error.message)
    res.status(500).json({error:"Internal server error"})
  }
}
