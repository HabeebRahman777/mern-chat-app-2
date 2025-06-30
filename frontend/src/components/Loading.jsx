import React from 'react'

const Loading = () => {
  const emojis =  [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂',
  '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌',
  '😍', '🥰', '😘', '😗', '😙', '😚', '😋',
  '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤩',
  '🥳', '😎', '🤠', '😺', '😸', '😹', '😻' ,
  '😄', '😁', '😆', '😅', '😂'
];
  
  return (
    <div className="flex flex-col pt-40 items-center justify-center h-full animate-pulse space-y-4">
      <div className="text-4xl animate-bounce">🔄</div>
      <div className="grid grid-cols-10 grid-rows-2 gap-2 p-4">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className="text-2xl animate-bounce"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>
      <p className="text-gray-600 font-medium text-sm"> please patient...</p>
    </div>
  )
}

export default Loading