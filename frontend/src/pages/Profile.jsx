import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Profile = () => {
    const {user}=useAuthStore()
  return (
    <div className=' flex items-center justify-center bg-green-100'>
    <div className='flex flex-col items-center justify-center h-screen rounded-xl w-xs bg-green-200'>
        <div className='flex flex-col items-center w-full p-3 justify-center bg-green-300'>
            <h1 className="text-xl font-semibold ">Profile</h1>
            <span>
                {user.Profile}
            </span>
            <span>
                {user.username}
            </span>
            <span>
                {user.email}
            </span>
        </div>
        <div className=" flex flex-col bg-base-300 p-6 w-full items-center bg-green-400">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{user.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
    </div>
    </div>
  )
}

export default Profile