import React, { useEffect, useState } from 'react'

const emojis = ['💬', '⌛', '📨', '🕐', '🔄', '✉️', '📡'];
const texts = ['Thinking...', 'Fetching messages...', 'Syncing chat...', 'Almost there...', 'Loading...', 'Typing...'];

const MessageLoading = () => {

  const [emojiIndex, setEmojiIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiIndex((prev) => (prev + 1) % emojis.length);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 animate-pulse p-4">
      <div className="text-6xl">{emojis[emojiIndex]}</div>
      <p className="text-lg font-medium mt-2">{texts[textIndex]}</p>
    </div>
  );
}

export default MessageLoading