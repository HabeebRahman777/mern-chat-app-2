import React,{useEffect} from 'react'
import {Toaster} from "react-hot-toast"
import { Routes,Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const checkingAuth = useAuthStore((state) => state.checkingAuth);


  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  if(checkingAuth) return(
    <div className="flex items-center justify-center h-screen">
      Loading.........................
    </div>
  )

  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={!user ? <Login/> : <Home/>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Home/>}/>
      </Routes>
    </div>
  )
}

export default App