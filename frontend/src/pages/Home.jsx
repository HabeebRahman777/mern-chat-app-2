import React from 'react'
import Sidebar from '../components/Sidebar'
import Notification from '../components/Notification'
import { useAuthStore } from '../store/useAuthStore'


const Home = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex flex-row">
      {user ? (
        <>
          <Sidebar />
          <div className="flex-1 p-4">
            <h2>Welcome, {user.username}</h2>
          </div>
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