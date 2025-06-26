import React from 'react';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import ChatContainer from '../components/ChatContainer';
import { useNavigate } from 'react-router-dom';
import { UserCircle, MessageSquareHeart } from 'lucide-react';

const Home = ({ isNotifOpen }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-screen bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 pt-14">
      {user ? (
        <>
          <Sidebar />
          {!selectedUser ? (
            <div className="flex-1 hidden sm:flex flex-col items-center justify-center border-x border-yellow-200 bg-white/80 rounded-xl mx-4 p-6 shadow-xl">
              <UserCircle className="w-16 h-16 text-yellow-700 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome, {user.username}
              </h2>
              <p className="text-lg text-gray-600">
                Select a chat to get started
              </p>
            </div>

          ) : (
            <ChatContainer />
          )}
          <Notification isOpen={isNotifOpen} />
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center p-10 rounded-xl bg-white/80 mx-auto shadow-2xl max-w-lg">
          <MessageSquareHeart className="w-20 h-20 text-yellow-600 mb-6" />
          <p className="text-2xl font-semibold text-gray-700">
            It’s just the two of you in this chat, no third wheel allowed 😉
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-200 shadow-md"
          >
            Let's Start
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
