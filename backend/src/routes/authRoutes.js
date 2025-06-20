import express from "express";
import { login, register ,logout,checkAuth } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",protectRoute,logout)
router.get("/check",protectRoute,checkAuth)


export default router;
