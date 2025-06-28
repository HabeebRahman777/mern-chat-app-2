import React, { useEffect,useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useChatStore } from '../store/useChatStore';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    messageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [getMessages, selectedUser._id, unsubscribeFromMessages, subscribeToMessages]);

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-500 shadow-inner rounded-lg">
      <ChatHeader />

      <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-2 scrollbar-hide">
        {messageLoading ? (
          <div className="text-center text-gray-700 animate-pulse">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-600 italic">No messages yet</div>
        ) : (
          messages.map((message) => {
            const isReceived = message.senderId === selectedUser._id;
            return (
              <div
                key={message._id}
                className={`max-w-xs md:max-w-sm lg:max-w-md p-3 rounded-xl shadow-sm text-sm ${
                  isReceived
                    ? 'bg-white self-start text-gray-900'
                    : 'bg-yellow-300 self-end text-gray-800'
                }`}
                ref={messageEndRef}
              > 
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text}
              </div>
            );
          })
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
