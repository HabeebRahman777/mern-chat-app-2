import React, { useEffect,useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useChatStore } from '../store/useChatStore';
import { formatMessageTime,formatDateHeader } from '../lib/time';

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

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const date = new Date(message.createdAt).toDateString();
      if (!acc[date]) acc[date] = []; 
      acc[date].push(message);
      return acc;
    }, {});
  };


  const groupedMessages = groupMessagesByDate(messages);

 
  return (
    <div className="flex-1 flex flex-col h-full w-full bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-500 shadow-inner rounded-lg">
      <ChatHeader />

      <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-2 scrollbar-hide">
        {messageLoading ? (
          <div className="text-center text-gray-700 animate-pulse">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-600 italic">No messages yet</div>
        ) : (
          
          Object.entries(groupedMessages).map(([date, messagesOnDate]) => (
            <div 
              className='flex flex-col space-y-2'
              key={date}
            >
              <div className="text-center text-xs text-gray-600 my-2">
                {formatDateHeader(date)}
              </div>
              {messagesOnDate.map((message,index) => {
            const isReceived = message.senderId === selectedUser._id;
            const isLast = index === messagesOnDate.length - 1;
            return (
              <div
                key={message._id}
                className={`max-w-xs md:max-w-sm flex flex-col lg:max-w-md p-1 rounded-xl shadow-sm text-sm ${
                  isReceived
                    ? 'bg-white self-start text-gray-900'
                    : 'bg-yellow-300 self-end text-gray-800'
                }`}
                ref={isLast ? messageEndRef : null}
              > 
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-1"
                  />
                )}
                {message.video && (
                  <video
                    src={message.video}
                    controls
                    className="sm:max-w-[250px] rounded-md mb-1"
                  />
                )}
                <div className='pr-4'>
                  {message.text}
                </div>
                
                <time className="text-xs opacity-50 ml-1 mt-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            );
              })}
            </div>
          ))
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
