import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';

const Notification = () => {
  const {
    users,
    getUsers,
    inRequests,
    getInRequests,
    friends,
    getFriends,
    acceptFriendRequest // ← assuming you define this
  } = useChatStore();

  useEffect(() => {
    getUsers();
    getInRequests();
    getFriends();
  }, [getUsers, getInRequests, getFriends]);

  // Filter out incoming requests from users already in friend list
  const incomingRequestUsers = users.filter(
    (user) =>
      inRequests?.includes(user._id) && !friends.includes(user._id)
  );

  

  return (
    <div className='bg-gray-200'>
      <h2>Notifications</h2>
      {incomingRequestUsers.length === 0 ? (
        <p>No incoming friend requests</p>
      ) : (
        <ul className="space-y-2">
          {incomingRequestUsers.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center border px-3 py-2 rounded"
            >
              <span>{user.username} sent you a friend request</span>
              <button
                onClick={() => acceptFriendRequest(user._id)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
