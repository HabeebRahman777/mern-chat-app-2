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
    <div className='flex-1 flex flex-col  bg-cyan-400 w-full h-full'>
        <ChatHeader/>
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide px-2 py-2">
          {messageLoading ? (
            <p>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p>No messages yet</p>
          ) : (
            messages.map((message) => (
              <div key={message._id} 
                className={`mb-2 p-2 rounded-lg  ${
                  message.senderId===selectedUser._id ?'bg-amber-700 self-start':'bg-amber-300 self-end'}`}>
                {message.text && <p className=''>{message.text}</p>}
              </div>
            ))
          )}
      </div>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer