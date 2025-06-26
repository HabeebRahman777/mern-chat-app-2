import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { Users, UserPlus } from 'lucide-react';

const Sidebar = () => {
  const { user,onlineUsers } = useAuthStore();
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
    setSelectedUser,
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
    <div className="flex h-full bg-violet-200 border-r shadow-md">
      {/* Toggle Button */}
      <div className="flex flex-col items-center justify-start px-2 pt-4">
        <button
          onClick={() => setShowUsers((prev) => !prev)}
          className="bg-blue-500 text-white w-10 h-40 flex items-center justify-center rounded-md hover:bg-blue-600 transition-all duration-200"
          title="Toggle Global Users"
        >
          <span className="-rotate-90 whitespace-nowrap text-xs font-semibold">
            {showUsers ? 'Hide Users' : 'Show Users'}
          </span>
        </button>
      </div>

      {/* Global Users Panel */}
      <div
        className={`transition-all duration-300 ${
          showUsers ? 'w-64' : 'w-0'
        } overflow-hidden border-r bg-white`}
      >
        <div className="p-4">
          <h2 className="font-semibold text-lg text-gray-700 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Global Users
          </h2>
          {loading ? (
            <p className="text-sm text-gray-500">Loading users...</p>
          ) : nonFriendUsers.length === 0 ? (
            <p className="text-sm text-gray-500">No users found</p>
          ) : (
            <ul className="space-y-2">
              {nonFriendUsers.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center px-3 py-2 rounded-md bg-gray-50 border hover:bg-gray-100"
                > 
                  <div>
                    <div
                      className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold hover:scale-105 hover:brightness-110 transition"
                    >
                      {user.profilePic ?
                      <img src={user.profilePic} alt="profile-pic" className='w-9 h-9 rounded-full' />  
                        : user.username.charAt(0).toUpperCase() 
                      }
                      
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.username}
                    </span>
                  </div>
                  
                  {outRequests?.includes(user._id) ? (
                    <span className="text-xs text-blue-500 font-semibold">Requested</span>
                  ) : (
                    <button
                      onClick={() => handleSendRequest(user._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs rounded-md flex items-center gap-1 transition"
                    >
                      <UserPlus size={14} />
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
      <div className="w-64 p-4 bg-white border-r">
        <h2 className="font-semibold text-lg text-gray-700 mb-3">Friends</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading friends...</p>
        ) : friendUsers.length === 0 ? (
          <p className="text-sm text-gray-500">You have no friends yet</p>
        ) : (
          <div className="space-y-2">
            {friendUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-md border text-sm transition ${
                  selectedUser?._id === user._id
                    ? 'bg-amber-300 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                
                <div className='flex flex-row gap-2 items-center'>
                    <div
                      className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold hover:scale-105 hover:brightness-110 transition"
                    >
                      {user.profilePic ?
                      <img src={user.profilePic} alt="profile-pic" className='w-9 h-9 rounded-full' />  
                        : user.username.charAt(0).toUpperCase() 
                      }
                      
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.username}
                    </span>
                </div>

                <span
                  className={`text-xs font-medium ${
                    onlineUsers.includes(user._id)
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
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
