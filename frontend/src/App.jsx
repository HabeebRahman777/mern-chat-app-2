import React,{useEffect,useState} from 'react'
import {Toaster} from "react-hot-toast"
import { Routes,Route,Navigate } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import ConfirmEmail from './pages/ConfirmEmail';
import ConfirmNotice from './pages/ConfirmNotice';
import Loading from './components/Loading'


const App = () => {
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const checkingAuth = useAuthStore((state) => state.checkingAuth);
  
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const toggleNotification = () => {
  setIsNotifOpen(prev => {
    const newState = !prev
    if (newState) useAuthStore.getState().setHasNewNotification(false) 
    return newState
  })
}

  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  if(checkingAuth) return(
    <Loading/>
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
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/confirm-notice" element={<ConfirmNotice />} />
      </Routes>
    </div>
  )
}

export default App