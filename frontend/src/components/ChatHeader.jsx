import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'

const ChatHeader = () => {
    const {onlineUsers}=useAuthStore()
    const {selectedUser}=useChatStore()
  return (
    <button className='bg-violet-700 flex flex-col items-start pl-2 border-2 w-full'>
        <span>{selectedUser.username}</span>
        <span className={`text-sm ${
        onlineUsers.includes(selectedUser._id) ? 'text-green-600' : 'text-gray-400'
        }`}>
        {onlineUsers.includes(selectedUser._id) ? 'online' : 'offline'}
        </span>
    </button>
  )
}

export default ChatHeader