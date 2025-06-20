import express from "express";
import { sendFriendRequest } from "../controllers/friendController.js";
import { acceptFriendRequest } from "../controllers/friendController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send", protectRoute, sendFriendRequest);
router.post("/accept", protectRoute, acceptFriendRequest);


export default router;
