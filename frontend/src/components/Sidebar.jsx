import React,{useEffect} from 'react'
import { useChatStore } from '../store/useChatStore'

const Sidebar = () => {

    const {users,getUsers,loading,friends,getFriends,outRequests,getOutRequests,sendFriendRequest}=useChatStore()

    useEffect(()=>{
        getUsers()
        getFriends()
        getOutRequests()
    },[getUsers])

    const nonFriendUsers = users.filter(
      (user) => !friends.includes(user._id)
    );

    const handleSendRequest = async (toUserId) => {
    await sendFriendRequest(toUserId);
    getOutRequests(); // ✅ Refresh the request list after sending
  };


   return (
    <div>
      <h2>Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : nonFriendUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
         <ul className="space-y-2">
          {nonFriendUsers.map((user) => (
            <li
              key={user._id}
              className="flex justify-between gap-4 items-center border px-2 py-1 rounded"
            >
              <span>{user.username}</span>
              {outRequests?.includes(user._id) ? (
                <span className="text-blue-500">Requested</span>
              ) : (
                <button
                  className="cursor-pointer bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  onClick={() => handleSendRequest(user._id)}
                >
                  Make Friend
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar