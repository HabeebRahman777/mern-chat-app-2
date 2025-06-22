import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import { socketHandler } from "./sockets/index.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP + Socket.IO server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});


connectDB();

socketHandler(io);

httpServer.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

export {io}