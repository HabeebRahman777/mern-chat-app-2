import React from 'react'

const fakeUsers = [
  { emoji: '🧑‍💻', name: 'Loading Dev...' },
  { emoji: '👩‍🚀', name: 'Connecting Astronaut...' },
  { emoji: '🧑‍🎨', name: 'Painting Pixels...' },
  { emoji: '👨‍🔧', name: 'Fixing Bugs...' },
  { emoji: '🧑‍🏫', name: 'Teaching AI...' },
  { emoji: '👮‍♀️', name: 'Securing Data...' },
  { emoji: '🧑‍🌾', name: 'Growing Friends...' },
  { emoji: '🧙‍♂️', name: 'Casting Code...' },
  { emoji: '🧑‍🚒', name: 'Extinguishing Errors...' },
  { emoji: '🤖', name: 'Loading Bot Friends...' },
];

const UserLoading = () => {
  return (
    <div className="animate-pulse space-y-3 p-4">
      {fakeUsers.map((user, index) => (
        <div
          key={index}
          className="flex items-center gap-3 bg-white rounded-md shadow px-3 py-2 border border-gray-100"
        >
          <div className="text-3xl">{user.emoji}</div>
          <div>
            <div className="w-40 h-4 bg-gray-200 rounded mb-1"></div>
            <div className="w-24 h-3 bg-gray-100 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserLoading