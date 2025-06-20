import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getFriends, getInRequests, getOutRequests, getUsers } from "../controllers/chatController.js";

const router = express.Router();

router.get("/getusers",protectRoute,getUsers)
router.get("/getfriends/:id",protectRoute,getFriends)
router.get("/outrequests/:id",protectRoute,getOutRequests)
router.get("/inrequests/:id",protectRoute,getInRequests)




export default router