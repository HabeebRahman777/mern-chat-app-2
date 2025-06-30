import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { Users, UserPlus } from 'lucide-react';
import { UserCircle2 } from 'lucide-react';

const Sidebar = () => {
  const { user, onlineUsers } = useAuthStore();
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
    countUnreadMessages,
    unreadCount,
    subscribeToMessages,
  } = useChatStore();

  const [activeTab, setActiveTab] = useState('friends'); 

  useEffect(() => {
    getUsers();
    getFriends();
    countUnreadMessages()
    getOutRequests();
  }, []);

  const handleSendRequest = async (toUserId) => {
    await sendFriendRequest(toUserId);
    getOutRequests();
  };

  const nonFriendUsers = users.filter((u) => !friends.includes(u._id));
  const friendUsers = users.filter((u) => friends.includes(u._id));

  
  if (selectedUser && window.innerWidth < 768) {
    return null; 
  }

  return (
    <div className="h-full w-full md:w-[400px] flex flex-col bg-white">
      {/* Top Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'global' ? (
          <>
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
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold overflow-hidden">
                        {user.profilePic ? (
                          <img src={user.profilePic} alt="profile-pic" className="w-full h-full object-cover" />
                        ) : (
                          user.username.charAt(0).toUpperCase()
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user.username}</span>
                    </div>

                    {outRequests?.includes(user._id) ? (
                      <span className="text-xs text-blue-500 ml-6 font-semibold">Requested</span>
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
          </>
        ) : (
          <>
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
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold overflow-hidden">
                        {user.profilePic ? (
                          <img src={user.profilePic} alt="profile-pic" className="w-full h-full object-cover" />
                        ) : (
                          user.username.charAt(0).toUpperCase()
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user.username}</span>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                      <span
                        className={`text-xs font-medium ml-6 ${
                          onlineUsers.includes(user._id) ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {onlineUsers.includes(user._id) ? 'online' : 'offline'}
                      </span>

                      {unreadCount[user._id] > 0 && (
                        <span className="text-xs bg-green-500 text-white rounded-full px-2 py-0.5">
                          {unreadCount[user._id]}
                        </span>
                      )}
                    </div>
  
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="w-full border-t flex justify-around bg-gray-100 py-2">
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex flex-col items-center text-sm ${
            activeTab === 'friends' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <UserCircle2 className="w-6 h-6" />
          Friends
        </button>
        <button
          onClick={() => setActiveTab('global')}
          className={`flex flex-col items-center text-sm ${
            activeTab === 'global' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Users className="w-6 h-6" />
          Global
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
