import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  checkingAuth:true,

  
  login: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post(
        "/auth/login",
        { email, password }
      );
      set({ user: res.data, loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed", loading: false });
      return false;
    }
  },

  logout: async () => {
    await axiosInstance.post("/auth/logout");
    set({ user: null });
  },

  signup: async({username,email,password})=>{
    try {
        set({loading:true,error:null})
        const res = await axiosInstance.post(
            "/auth/register",
            {username,email,password}
        )
        set({user:res.data,loading:false})
    } catch (err) {
        set({error:err.response?.data?.message || "Signup failed" ,loading:false})
    }
  },

  checkAuth:async()=>{
        try {
          const res = await axiosInstance.get("/auth/check")
          set({user:res.data})
        } catch (error) {
          console.log("Error in checkAuth",error)
          set({user:null})
        }finally{
          set({checkingAuth:false})  
        }
    },

}));
