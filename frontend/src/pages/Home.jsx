import React from 'react'
import Sidebar from '../components/Sidebar'
import Notification from '../components/Notification'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import ChatContainer from '../components/ChatContainer'

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const {selectedUser} = useChatStore()
  return (
    <div className="flex flex-row ">
      {user ? (
        <>
          <Sidebar />
          {!selectedUser?(
            <div className="flex-1 p-4 bg-gray-200 border-x">
              <h2>Welcome, {user.username}</h2>
            </div>
            ):
            <ChatContainer/>
          }
          <Notification/>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <p>It’s just the two of you in this chat, no third wheel allowed 😉</p>
          <span className='bg-green-400 px-2.5 py-1.5 mt-3'>Let's Start</span>
        </div>
      )}
    </div>
  )
}

export default Home