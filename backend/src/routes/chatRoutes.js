import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getFriends, getInRequests, getMessages, getOutRequests, getUsers, markRead, sendMessage, unreadCount } from "../controllers/chatController.js";

const router = express.Router();

router.get("/getusers",protectRoute,getUsers)
router.get("/getfriends/:id",protectRoute,getFriends)
router.get("/outrequests/:id",protectRoute,getOutRequests)
router.get("/inrequests/:id",protectRoute,getInRequests)

router.post('/send/:id',protectRoute,sendMessage)
router.patch('/markread/:senderId',protectRoute,markRead)
router.get('/unreadcount',protectRoute,unreadCount)
router.get('/:id',protectRoute,getMessages)




export default router