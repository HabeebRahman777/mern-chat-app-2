import User from "../models/User.js"

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
      console.log("out requests",user.outgoingRequests);
      
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
      console.log("in requests",user.incomingRequests);
      
      res.json({requests:user.incomingRequests})
  } catch (error) {
    console.error("Error fetching requests list:", error);
    res.status(500).json({ message: "Internal server error" })
  }
}