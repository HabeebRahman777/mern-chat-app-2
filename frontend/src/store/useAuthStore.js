import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {io} from "socket.io-client"
import toast from "react-hot-toast";
import { useChatStore } from './useChatStore'; 



const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set,get) => ({
  user: null,
  loading: false,
  error: null,
  checkingAuth:true,
  socket:null,
  onlineUsers:[],

  
  login: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post(
        "/auth/login",
        { email, password }
      );
      set({ user: res.data, loading: false });
      
      get().connectSocket()

    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed", loading: false });
    }
  },

  logout: async () => {
    await axiosInstance.post("/auth/logout");
    set({ user: null });
    toast.success("Logged out successfully")
    get().disconnectSocket()
    useChatStore.getState().clearSelectedUser();
  },

  signup: async({username,email,password})=>{
    try {
        set({loading:true,error:null})
        const res = await axiosInstance.post(
            "/auth/register",
            {username,email,password}
        )
        set({user:res.data,loading:false})
        get().connectSocket()
    } catch (err) {
        set({error:err.response?.data?.message || "Signup failed" ,loading:false})
    }
  },

  checkAuth:async()=>{
        try {
          const res = await axiosInstance.get("/auth/check")
          set({user:res.data})
          get().connectSocket()
        } catch (error) {
          console.log("Error in checkAuth",error)
          set({user:null})
        }finally{
          set({checkingAuth:false})  
        }
    },

    connectSocket:()=>{
      const {user} = get()
      if (!user || get().socket?.connected) return

      const socket = io(BASE_URL,{
        query:{
          userId:user._id,
        },
      })
      socket.connect();
      socket.emit("setup", user._id);

      set({socket:socket})
      socket.on("new_friend_request", (fromUser) => {
        toast.success(`${fromUser.username} sent you a friend request!`);
        useChatStore.getState().getInRequests();
      });

      socket.on("friend_request_accepted", (fromUser) => {
        toast.success(`${fromUser.username} accepted your friend request!`);
        useChatStore.getState().getFriends();
        useChatStore.getState().getOutRequests();
      });

      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });

    },

    disconnectSocket: () => {
      if (get().socket?.connected) get().socket.disconnect();
    },

}));
