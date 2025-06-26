import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { CircleDot } from 'lucide-react';

const ChatHeader = () => {
  const { onlineUsers } = useAuthStore();
  const { selectedUser } = useChatStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="bg-violet-700 px-4 py-3 flex items-center justify-between border-b border-violet-600 text-white">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{selectedUser.username}</span>
          <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-300'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <CircleDot className={`w-4 h-4 ${isOnline ? 'text-green-400' : 'text-gray-400'}`} />
      </div>
    </div>
  );
};

export default ChatHeader;
