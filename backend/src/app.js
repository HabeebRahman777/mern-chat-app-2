import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"


const app = express();

app.use(cors({ origin: "http://localhost:5173",credentials:true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/chat", chatRoutes);



export default app;
