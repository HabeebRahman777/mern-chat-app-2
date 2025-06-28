import React, { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Image, Send, Video, X } from 'lucide-react';
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState('');
  const { sendMessage } = useChatStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast.error("Only image and video files are allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (isImage) {
        setImagePreview(reader.result);
        setVideoPreview(null);
      } else if (isVideo) {
        setVideoPreview(reader.result);
        setImagePreview(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeMedia = () => {
    setImagePreview(null);
    setVideoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !videoPreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        video: videoPreview,
      });

      setText("");
      setImagePreview(null);
      setVideoPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="bg-violet-800 px-4 py-3">
      {imagePreview && (
        <div className="mb-2 flex items-center gap-2">
          <img src={imagePreview} alt="preview" className="w-20 h-20 rounded-md border object-cover" />
          <button onClick={removeMedia} className="text-red-500 hover:text-red-700">
            <X size={18} />
          </button>
        </div>
      )}

      {videoPreview && (
        <div className="mb-2 flex items-center gap-2">
          <video src={videoPreview} controls className="w-32 rounded-md border aspect-video object-cover" />
          <button onClick={removeMedia} className="text-red-500 hover:text-red-700">
            <X size={18} />
          </button>
        </div>
      )}

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
          accept="image/*,video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleMediaChange}
        />

        <button
          type="button"
          className={`p-1 rounded-full hover:bg-gray-100 transition ${
            imagePreview || videoPreview ? "text-emerald-500" : "text-zinc-400"
          }`}
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image/Video"
        >
          {imagePreview ? <Image size={20} /> : <Video size={20} />}
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
  );
};

export default MessageInput;
