import React from 'react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'

const ChatContainer = () => {
  const {messages,getMessages,messageLoading,selectedUser,subscribeToMessages,unsubscribeFromMessages}=useChatStore()
  useEffect(()=>{
    getMessages(selectedUser._id)
    subscribeToMessages()
    return ()=>unsubscribeFromMessages()
  },[getMessages,selectedUser._id,unsubscribeFromMessages,subscribeToMessages])
  return (
    <div className=''>
        <ChatHeader/>
        <div className="">
          {messageLoading ? (
            <p>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p>No messages yet</p>
          ) : (
            messages.map((message) => (
              <div key={message._id} className="mb-2">
                {message.text && <p>{message.text}</p>}
              </div>
            ))
          )}
      </div>
        <MessageInput/>
    </div>
  )
}

export default ChatContainer