import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore=create((set,get)=>({

    messages:[],
    users:[],
    outRequests:[],
    inRequests:[],
    friends:[],
    selectedUser:null,
    loading:false,

    getUsers:async()=>{
        set({loading:true})
        try {
            const res=await axiosInstance.get("/chat/getusers")
            set({users:res.data})
        } catch (error) {
            console.log("Error in getUsers",error)
            set({users:[]})
        }finally{
            set({loading:false})
        }
    },

    getFriends:async()=>{
        try {
            const {user} = useAuthStore.getState()
            const response = await axiosInstance.get(`/chat/getfriends/${user._id}`)
            set({
                friends:response.data.friends
            })
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    },

    getOutRequests:async()=>{
        try {
            const {user} = useAuthStore.getState()
            const response = await axiosInstance.get(`chat/outrequests/${user._id}`)
            set({
                outRequests:response.data.requests
            })
        } catch (error) {
            console.error("Error fetching requests:", error.response?.data?.message || error.message);
        }
    },

    getInRequests:async()=>{
        try {
            const {user} = useAuthStore.getState()
            const response = await axiosInstance.get(`chat/inrequests/${user._id}`)
            set({
                inRequests:response.data.requests
            })
        } catch (error) {
            console.error("Error fetching requests:", error.response?.data?.message || error.message);
        }
    },

    sendFriendRequest:async(userId)=>{
        try {
            const { socket, user } = useAuthStore.getState();
            await axiosInstance.post("friends/send",{toUserId:userId})
            socket.emit("send_friend_request", {
                toUserId: userId,
                fromUser: user,
            });
        } catch (error) {
            console.error("Error sending friend request:", error.response?.data?.message || error.message);
        }
    },

    acceptFriendRequest:async(userId)=>{
        try {
            const { socket, user } = useAuthStore.getState();
            await axiosInstance.post("friends/accept",{fromUserId:userId})
            socket.emit("accept_friend_request", {
            toUserId: userId,
            fromUser: user,
            });
            get().getInRequests()
            get().getFriends()
        } catch (error) {
            console.error("Error accepting friend request:", error.response?.data?.message || error.message);
        }
    },


}))