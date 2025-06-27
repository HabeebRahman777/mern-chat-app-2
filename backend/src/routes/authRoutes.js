import express from "express";
import { login, register ,logout,checkAuth, updateProfile, confirmEmail } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",protectRoute,logout)
router.get("/check",protectRoute,checkAuth)
router.put("/update-profile",protectRoute,updateProfile)
router.get("/confirm-email/",confirmEmail)


export default router;
