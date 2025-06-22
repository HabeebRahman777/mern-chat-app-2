import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getFriends, getInRequests, getMessages, getOutRequests, getUsers, sendMessage } from "../controllers/chatController.js";

const router = express.Router();

router.get("/getusers",protectRoute,getUsers)
router.get("/getfriends/:id",protectRoute,getFriends)
router.get("/outrequests/:id",protectRoute,getOutRequests)
router.get("/inrequests/:id",protectRoute,getInRequests)
router.get('/:id',protectRoute,getMessages)
router.post('/send/:id',protectRoute,sendMessage)




export default router