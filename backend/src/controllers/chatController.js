import Message from "../models/Message.js"
import User from "../models/User.js"
import { getReceiverSocketId } from "../sockets/index.js"
import {io} from "../server.js"
import cloudinary from "../config/cloudinary.js";


export const getUsers = async(req,res)=>{
    try {
      const loggedInUserId=req.user._id
      const filteredUsers = await User.find({
        _id: { $ne: loggedInUserId },
        verified: true 
      }).select("-password");
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

export const sendMessage = async (req, res) => {
  try {
    const { text, image, video } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = null;
    let videoUrl = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        resource_type: "image",
      });
      imageUrl = uploadResponse.secure_url;
    }

    if (video) {
      const uploadResponse = await cloudinary.uploader.upload(video, {
        resource_type: "video",
      });
      videoUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      video: videoUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


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

export const markRead=async(req,res)=>{
  const { senderId } = req.params
  const receiverId = req.user._id
  

  try {
    await Message.updateMany(
      {
        senderId,
        receiverId,
        read: false,
      },
      { $set: { read: true } }
    );
    res.status(200).json({ message: "Messages marked as read." });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ message: "Failed to mark messages as read." });
  }
}

export const unreadCount = async (req, res) => {
  const userId = req.user._id;

  try {
    const counts = await Message.aggregate([
      { $match: { receiverId: userId, read: false } },
      {
        $group: {
          _id: "$senderId",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert to object format
    const unreadMap = counts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.status(200).json(unreadMap); // { senderId1: 3, senderId2: 5 }
  } catch (error) {
    console.error("Unread count error:", error);
    res.status(500).json({ message: "Failed to fetch unread counts" });
  }
};
