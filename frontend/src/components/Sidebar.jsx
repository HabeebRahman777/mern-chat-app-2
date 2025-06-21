import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';

const Sidebar = () => {
  const {
    users,
    getUsers,
    loading,
    friends,
    getFriends,
    outRequests,
    getOutRequests,
    sendFriendRequest,
  } = useChatStore();

  useEffect(() => {
    getUsers();
    getFriends();
    getOutRequests();
  }, [getUsers]);

  const nonFriendUsers = users.filter(
    (user) => !friends.includes(user._id)
  );

  const friendUsers = users.filter((user) => friends.includes(user._id));

  const handleSendRequest = async (toUserId) => {
    await sendFriendRequest(toUserId);
    getOutRequests();
  };

  return (
    <div>
      {/* Users to Add as Friend */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Users</h2>
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

      <div>
        <h2 className="font-semibold text-lg mb-2">Friends</h2>
        {loading ? (
          <p>Loading friends...</p>
        ) : friendUsers.length === 0 ? (
          <p>You have no friends yet</p>
        ) : (
          <ul className="space-y-2">
            {friendUsers.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center border px-2 py-1 rounded"
              >
                <span>{user.username}</span>
                <span className="text-green-600 text-sm">online/offline</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
