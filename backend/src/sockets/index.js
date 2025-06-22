const onlineUsers = new Map();

export function getReceiverSocketId(userId) {
  return onlineUsers.get(userId);
}

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("setup", (userId) => {
      if (userId) {
        onlineUsers.set(userId, socket.id);
        io.emit("getOnlineUsers", Array.from(onlineUsers.keys()))
      }
    });

    socket.on("send_friend_request", ({ toUserId, fromUser }) => {
      const receiverSocketId = onlineUsers.get(toUserId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("new_friend_request", fromUser);
        console.log(`📩 Friend request sent to ${toUserId}`);
      }
    });

    socket.on("accept_friend_request", ({ toUserId, fromUser }) => {
      const receiverSocketId = onlineUsers.get(toUserId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("friend_request_accepted", fromUser);
        console.log(`✅ Friend request accepted by ${fromUser._id}`);
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`🗑️ Removed user ${userId} from onlineUsers`);
          break;
        }
      }
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()))
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};
