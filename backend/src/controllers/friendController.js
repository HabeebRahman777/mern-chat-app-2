import User from "../models/User.js";
import {io} from "../server.js"

export const sendFriendRequest = async (req, res) => {
  const { toUserId } = req.body;
  const fromUserId = req.user._id;

  if (toUserId === String(fromUserId)) {
    return res.status(400).json({ message: "You can't send a request to yourself." });
  }

  try {
    const toUser = await User.findById(toUserId);
    const fromUser = await User.findById(fromUserId);

    if (!toUser || !fromUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (toUser.friends.includes(fromUserId)) {
      return res.status(400).json({ message: "Already friends." });
    }

    if (toUser.incomingRequests.includes(fromUserId)) {
      return res.status(400).json({ message: "Request already sent." });
    }

    toUser.incomingRequests.push(fromUserId);
    fromUser.outgoingRequests.push(toUserId);

    await toUser.save();
    await fromUser.save();

    res.status(200).json({ message: "Friend request sent." });

    io.to(toUserId).emit("new_friend_request", {
      fromUser: {
        _id: fromUser._id,
        fullName: fromUser.fullName,
        profilePic: fromUser.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error sending friend request", error: error.message });
  }
};

export const acceptFriendRequest = async (req, res) => {
  const fromUserId = req.body.fromUserId; 
  const toUserId = req.user._id; 

  try {
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!toUser.incomingRequests.includes(fromUserId)) {
      return res.status(400).json({ message: "No request from this user." });
    }

    toUser.incomingRequests = toUser.incomingRequests.filter(
      (id) => id.toString() !== fromUserId
    );
    fromUser.outgoingRequests = fromUser.outgoingRequests.filter(
      (id) => id.toString() !== toUserId.toString()
    );

    toUser.friends.push(fromUserId);
    fromUser.friends.push(toUserId);

    await toUser.save();
    await fromUser.save();

    io.to(fromUserId.toString()).emit("friend_request_accepted", {
      byUser: {
        _id: toUser._id,
        fullName: toUser.fullName,
        profilePic: toUser.profilePic
      }
    });

    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    res.status(500).json({ message: "Error accepting friend request", error: error.message });
  }
};

export const declineFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const requestSenderId = req.params.id;

    // Remove requestSenderId from incomingRequests of the logged-in user
    // Remove userId from outgoingRequests of the sender
    const user = await User.findById(userId);
    const sender = await User.findById(requestSenderId);

    if (!user || !sender) {
      return res.status(404).json({ message: "User not found" });
    }

    user.incomingRequests = user.incomingRequests.filter(
      (id) => id.toString() !== requestSenderId
    );

    sender.outgoingRequests = sender.outgoingRequests.filter(
      (id) => id.toString() !== userId.toString()
    );

    await user.save();
    await sender.save();

    res.status(200).json({ message: "Friend request declined" });
  } catch (error) {
    console.error("Error declining friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

