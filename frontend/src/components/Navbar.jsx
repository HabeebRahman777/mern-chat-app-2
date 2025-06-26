import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Bell } from 'lucide-react';

const Navbar = ({ onBellClick }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const hasNewNotification = useAuthStore((state) => state.hasNewNotification);

  const navigate = useNavigate();
  const location = useLocation();
  const [firstLetter, setFirstLetter] = useState('');

  const isProfilePage = location.pathname === '/profile';

  useEffect(() => {
    if (user?.username) {
      setFirstLetter(user.username.charAt(0).toUpperCase());
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-lime-500 shadow-md z-50 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-white hover:text-lime-100 transition-all">
        ChatApp
      </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-white font-medium hover:underline hover:text-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-lime-600 px-4 py-1.5 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            {!isProfilePage && (
              <button onClick={onBellClick} className="relative">
                <Bell className="w-6 h-6 text-white hover:text-lime-100 transition cursor-pointer" />
                {hasNewNotification && (
                  <>
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-600"></span>
                  </>
                )}
              </button>
            )}
            <Link
              to="/profile"
              className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold hover:scale-105 hover:brightness-110 transition"
            >
              {user.profilePic ?
              <img src={user.profilePic} alt="profile-pic" className='w-9 h-9 rounded-full' />  
                : firstLetter 
              }
              
            </Link>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-3 py-1.5 rounded-md font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
