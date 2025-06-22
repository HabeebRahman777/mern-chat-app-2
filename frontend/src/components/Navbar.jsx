import React,{useEffect,useState} from 'react'
import { Link,useNavigate,useLocation } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import { Bell } from 'lucide-react'


const Navbar = ({onBellClick}) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate(); 
  const location = useLocation()
  const [firstLetter,setFirstLetter]=useState()
  const hasNewNotification = useAuthStore((state) => state.hasNewNotification)

  const isProfilePage = location.pathname === '/profile'

  useEffect(() => {
    if (!user) return;

    if (user?.username) {
      setFirstLetter(user.username.charAt(0).toUpperCase());
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/"); 
  };

  return (
    <header className='fixed w-full bg-lime-400 top-0 py-2 px-2 flex flex-row items-center justify-between'>
        <div>
            <Link to='/'>ChatApp</Link>
        </div>
        <div className='flex gap-2'>
            {!user ? (
                <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                </>
            ) : (
                <div className='flex flex-row items-center gap-1.5'>
                  {!isProfilePage && (
                    <button onClick={onBellClick} className='relative'>
                      <Bell className="w-6 h-6 text-gray-700 cursor-pointer" />
                      {hasNewNotification && (
                        <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full animate-ping" />
                      )}
                      {hasNewNotification && (
                        <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full" />
                      )}
                    </button>
                  )}                
                  <Link to='/profile'
                    className="w-8 h-8 rounded-full cursor-pointer bg-orange-500 text-white flex items-center justify-center text-lg font-bold ">
                    {firstLetter}
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    </header>
  )
}

export default Navbar