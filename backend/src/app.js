import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";


const app = express();

app.use(cors({ origin: "http://localhost:5173",credentials:true }));
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);


export default app;
