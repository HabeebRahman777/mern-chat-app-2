import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const{onlineUsers}=useAuthStore()
  const {
    users,
    getUsers,
    loading,
    friends,
    getFriends,
    outRequests,
    getOutRequests,
    sendFriendRequest,
    selectedUser,
    setSelectedUser
  } = useChatStore();

  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    getUsers();
    getFriends();
    getOutRequests();
  }, [getUsers]);


  const handleSendRequest = async (toUserId) => {
    await sendFriendRequest(toUserId);
    getOutRequests();
  };

  const nonFriendUsers = users.filter((user) => !friends.includes(user._id));
  const friendUsers = users.filter((user) => friends.includes(user._id));

  return (
    <div className="flex">
      
      <div className="flex flex-col items-center bg-gray-200 px-2 py-4">
        <button
          onClick={() => setShowUsers((prev) => !prev)}
          className="bg-blue-500 text-white w-10 h-40 flex items-center justify-center rounded hover:bg-blue-600"
        >
          <span className="-rotate-90 whitespace-nowrap text-sm">
            {showUsers ? 'Hide Users' : 'Show Users'}
          </span>
        </button>
      </div>

      {/* Global Users Panel */}
      <div
        className={`transition-all duration-300 ${
          showUsers ? 'w-64 opacity-100' : 'w-0 opacity-0'
        } overflow-hidden bg-white border-l`}
      >
        <div className="p-4">
          <h2 className="font-semibold text-lg mb-2">Global Users</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : nonFriendUsers.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul className="space-y-2">
              {nonFriendUsers.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center border px-2 py-1 rounded"
                >
                  <span>{user.username}</span>
                  {outRequests?.includes(user._id) ? (
                    <span className="text-blue-500 text-sm">Requested</span>
                  ) : (
                    <button
                      onClick={() => handleSendRequest(user._id)}
                      className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
                    >
                      Add
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Friends Panel */}
      <div className="w-64 bg-gray-100 p-4 border-l">
        <h2 className="font-semibold text-lg mb-2">Friends</h2>
        {loading ? (
          <p>Loading friends...</p>
        ) : friendUsers.length === 0 ? (
          <p>You have no friends yet</p>
        ) : (
          <div className="space-y-2">
            {friendUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className="flex justify-between items-center space-x-3 border px-2 py-1 rounded hover:bg-amber-300 transition-colors"
              >
                  <span>{user.username}</span>
                  <span className={`text-sm ${
                    onlineUsers.includes(user._id) ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {onlineUsers.includes(user._id) ? 'online' : 'offline'}
                  </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
