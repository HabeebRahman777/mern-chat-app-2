import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';

const Notification = ({ isOpen }) => {
  const {
    users,
    getUsers,
    inRequests,
    getInRequests,
    friends,
    getFriends,
    acceptFriendRequest,
  } = useChatStore();

  useEffect(() => {
    getUsers();
    getInRequests();
    getFriends();
  }, [getUsers, getInRequests, getFriends]);

  const incomingRequestUsers = users.filter(
    (user) => inRequests?.includes(user._id) && !friends.includes(user._id)
  );

  return (
    <div
      className={`top-0 right-0 h-full transition-all duration-300 ease-in-out ${
        isOpen ? 'w-72' : 'w-0'
      } overflow-hidden shadow-2xl bg-gradient-to-b from-emerald-600 to-emerald-500`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-emerald-700 border-b border-emerald-800 shadow-sm">
        <h2 className="text-lg font-semibold text-white tracking-wide">Friend Requests</h2>
      </div>

      <div className="p-4 h-full overflow-y-auto">
        {incomingRequestUsers.length === 0 ? (
          <p className="text-sm text-white/80 italic">No new friend requests</p>
        ) : (
          <ul className="space-y-3">
            {incomingRequestUsers.map((user) => (
              <li
                key={user._id}
                className="flex flex-col justify-between items-center p-3 bg-white rounded-lg shadow-sm border  border-gray-200"
              >
                <span className="text-sm font-medium text-gray-800">
                  {user.username}
                </span>
                <div className='flex flex-row gap-1 items-center justify-center'>
                    <button
                    onClick={() => acceptFriendRequest(user._id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => acceptFriendRequest(user._id)}
                    className="bg-red-400 hover:bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded transition"
                  >
                    Decline
                  </button>

                </div>
                <button
                  onClick={() => acceptFriendRequest(user._id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded transition"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification;
