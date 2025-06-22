import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';

const Notification = ({ isOpen}) => {
  const {
    users,
    getUsers,
    inRequests,
    getInRequests,
    friends,
    getFriends,
    acceptFriendRequest 
  } = useChatStore();

  useEffect(() => {
    getUsers();
    getInRequests();
    getFriends();
  }, [getUsers, getInRequests, getFriends]);

  const incomingRequestUsers = users.filter(
    (user) =>
      inRequests?.includes(user._id) && !friends.includes(user._id)
  );

  

  return (
    <div
      className={`top-0 right-0 h-full bg-green-500 transition-all duration-300 ${
        isOpen ? ' w-60' : ' w-0'
      } overflow-hidden`}
    >
      
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300  ">
        <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
      </div>

      <div className="p-4 h-full overflow-y-auto">
        {incomingRequestUsers.length === 0 ? (
          <p className="text-sm text-gray-600">No incoming friend requests</p>
        ) : (
          <ul className="space-y-3">
            {incomingRequestUsers.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center p-3 bg-white rounded shadow-sm border border-gray-200"
              >
                <span className="text-sm text-gray-800">
                  <strong>{user.username}</strong> sent you a friend request
                </span>
                <button
                  onClick={() => acceptFriendRequest(user._id)}
                  className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
};

export default Notification;
