import React, {useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState('');
  const { sendMessage } = useChatStore();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div>
      {imagePreview && (
        <div className="p-2 flex flex-row items-start gap-1">
          <img
            src={imagePreview}
            alt="preview"
            className="w-20 h-20 object-cover rounded-md border"
          />
          <button onClick={removeImage} className="text-red-500 hover:text-red-700">
            <X size={18} />
          </button>
        </div>
      )}
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

        <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
        />

        <button
          type="button"
          className={`p-1 rounded-full hover:bg-gray-100 transition
                      ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image"
        >
          <Image size={20} />
        </button>

        <button
          type="submit"
          className="text-white bg-violet-600 hover:bg-violet-700 p-2 rounded-full transition"
          title="Send"
        >
          <Send size={18} className="stroke-white" />
        </button>
      </form>
    </div>
    </div>
  );
};

export default MessageInput;
