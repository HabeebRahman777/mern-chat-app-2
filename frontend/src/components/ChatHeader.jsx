import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { CircleDot, ArrowLeft } from 'lucide-react';

const ChatHeader = () => {
  const { onlineUsers } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="bg-violet-700 px-4 py-3 flex items-center justify-between border-b border-violet-600 text-white">
      
      {/* Back Button - visible only on mobile */}
      <button
        onClick={() => setSelectedUser(null)}
        className="md:hidden mr-3 text-white hover:text-gray-300 transition"
        title="Back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Username and Status */}
      <div className="flex-1 flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{selectedUser.username}</span>
          <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-300'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Online dot */}
      <div className="flex items-center">
        <CircleDot className={`w-4 h-4 ${isOnline ? 'text-green-400' : 'text-gray-400'}`} />
      </div>
    </div>
  );
};

export default ChatHeader;
