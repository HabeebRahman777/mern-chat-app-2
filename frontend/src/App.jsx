import React,{useEffect,useState} from 'react'
import {Toaster} from "react-hot-toast"
import { Routes,Route,Navigate } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const checkingAuth = useAuthStore((state) => state.checkingAuth);
  
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const toggleNotification = () => {
  setIsNotifOpen(prev => {
    const newState = !prev
    if (newState) useAuthStore.getState().setHasNewNotification(false) // ✅ reset red dot
    return newState
  })
}

  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  if(checkingAuth) return(
    <div className="flex items-center justify-center h-screen">
      Loading.........................
    </div>
  )

  return (
    <div className='bg-red-700'>
      <Toaster/>
      <Navbar onBellClick={toggleNotification}/>
      <Routes>
        <Route path='/' element={<Home isNotifOpen={isNotifOpen}/>}/>
        <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to="/"/>}/>
        <Route path='/profile' element={user ? <Profile/> : <Navigate to="/"/>}/>
      </Routes>
    </div>
  )
}

export default App