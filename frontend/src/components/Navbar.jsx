import React from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    await logout();
    navigate("/"); 
  };

  return (
    <header className='bg-red-500 top-0 py-2 px-2 flex justify-between'>
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
                <button onClick={handleLogout}>Logout</button>
            )}
        </div>
    </header>
  )
}

export default Navbar