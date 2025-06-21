const onlineUsers = new Map(); // make sure this exists in scope or export/import

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // 🔹 1. Save socket to userId mapping
    socket.on("setup", (userId) => {
      if (userId) {
        onlineUsers.set(userId, socket.id);
        socket.join(userId); // Join a personal room
        console.log(`👤 User ${userId} joined personal room`);
      }
    });

    // 🔹 2. When user sends a friend request
    socket.on("send_friend_request", ({ toUserId, fromUser }) => {
      const receiverSocketId = onlineUsers.get(toUserId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("new_friend_request", fromUser);
        console.log(`📩 Friend request sent to ${toUserId}`);
      }
    });

    // 🔹 3. When friend request is accepted
    socket.on("accept_friend_request", ({ toUserId, fromUser }) => {
      const receiverSocketId = onlineUsers.get(toUserId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("friend_request_accepted", fromUser);
        console.log(`✅ Friend request accepted by ${fromUser._id}`);
      }
    });

    // 🔴 4. Cleanup on disconnect
    socket.on("disconnect", () => {
      for (let [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`🗑️ Removed user ${userId} from onlineUsers`);
          break;
        }
      }
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};
