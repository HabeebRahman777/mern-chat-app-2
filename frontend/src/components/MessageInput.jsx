import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Send } from 'lucide-react';

const MessageInput = () => {
  const [text, setText] = useState('');
  const { sendMessage } = useChatStore();

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
      });
      setText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="bg-violet-800 px-4 py-3">
      <form
        onSubmit={handleMessage}
        className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
        />
        <button
          type="submit"
          className="text-white bg-violet-600 hover:bg-violet-700 p-2 rounded-full transition"
          title="Send"
        >
          <Send size={18} className="stroke-white" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
