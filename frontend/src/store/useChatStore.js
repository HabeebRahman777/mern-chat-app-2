import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useChatStore=create((set,get)=>({

    messages:[],
    users:[],
    outRequests:[],
    inRequests:[],
    friends:[],
    selectedUser:null,
    loading:false,
    messageLoading:false,
    isSending:false,
    unreadCount: {},

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
        const {user} = useAuthStore.getState()
        if(!user) return

        try {
            
            const response = await axiosInstance.get(`chat/inrequests/${user._id}`)
            const incoming = response.data.requests || [];

            set({
                inRequests: incoming,
            });

            if (incoming.length > 0) {
                useAuthStore.setState({ hasNewNotification: true });
            }
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

    setSelectedUser:async (selectedUser) => {
        set({selectedUser});

        if (!selectedUser?._id) return;
        
        try {
            await get().markRead(selectedUser);

            
            const currentUnread = get().unreadCount;
            const { [selectedUser._id]: _, ...rest } = currentUnread; 
            set({ unreadCount: rest });

        } catch (error) {
            console.error("Failed to mark messages as read or update unread count:", error.message);
        }

        
    },

    sendMessage:async (messageData)=>{
        set({isSending:true})
        const{selectedUser,messages}=get()
        try {
            const res=await axiosInstance.post(`/chat/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,res.data],isSending:false})
        } catch (error) {
            console.error("Error in sending messages:", error.response?.data?.message || error.message);
            set({isSending:false})
        }
    },

    getMessages:async(userId)=>{
        set({messageLoading:true})
        try {
            const res=await axiosInstance.get(`/chat/${userId}`,)
            set({messages:res.data})
            set({messageLoading:false})
            
        } catch (error) {
            console.error("Error in fetching messages:", error.response?.data?.message || error.message);
        }
    },

    subscribeToMessages: () => {
        
        const socket = useAuthStore.getState().socket;

        if (!socket) return

        socket.off("newMessage");

        socket.on("newMessage", (newMessage) => {
            const { selectedUser, messages, users, unreadCount } = get();
            
            const isFromSelectedUser = selectedUser && newMessage.senderId === selectedUser._id;

            if (isFromSelectedUser) {
                set({ messages: [...messages, newMessage] });
            } else {
                const updatedUnreadCount = {
                    ...unreadCount,
                    [newMessage.senderId]: (unreadCount[newMessage.senderId] || 0) + 1,
                };
                set({ unreadCount: updatedUnreadCount });

                const sender = users.find((u) => u._id === newMessage.senderId);
                const senderName = sender?.username || "New Message";
                toast.success(`${senderName}: ${newMessage.text || "📎 Media message"}`, {
                    icon: "💬",
                });
            }
        });
    },


  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  clearSelectedUser: () => set({ selectedUser: null }),

  countUnreadMessages: async () => {
    try {
        const res = await axiosInstance.get('/chat/unreadcount');
        const unreadCount = res.data;

        set({ unreadCount });


    } catch (error) {
        console.error(
        "Error fetching unread message counts:",
        error.response?.data?.message || error.message
        );
    }
 },

 markRead : async(selectedUser)=>{
    try {
      await axiosInstance.patch(`/chat/markread/${selectedUser._id}`);

    } catch (error) {
        console.error("Error marking messages as read:", error.response?.data?.message || error.message);
    }
 }



}))