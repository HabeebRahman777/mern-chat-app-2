export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // Handle user setup with userId
    socket.on("setup", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.join(userId); // Join a room named by userId
    });

    socket.on("send_friend_request", ({ toUserId, fromUser }) => {
      const receiverSocketId = onlineUsers.get(toUserId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("new_friend_request", fromUser);
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};
