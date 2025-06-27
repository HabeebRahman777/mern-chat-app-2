import React,{useState} from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from "react-router-dom";
import {Loader2} from "lucide-react"
import toast from 'react-hot-toast'


const Signup = () => {
    const {signup,isSigningUp}=useAuthStore()
    const error = useAuthStore((state) => state.error);
  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();

    const validateForm = () => {
    if (!username.trim()) return toast.error("Full name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
    if (!password) return toast.error("Password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };
  
    const handleSignup = async (e) => {
      e.preventDefault();
      const valid=validateForm()
      if (valid===true){
        const success = await signup({ username, email, password });
        if (success) {
          navigate("/confirm-notice");
        }
      }
      
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-tr from-lime-300 via-lime-400 to-yellow-300 flex items-center justify-center pt-12 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-lime-700 mb-6">Sign Up</h2>
  
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm border border-red-300">
              {error}
            </div>
          )}
  
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="😃😃😃😃😃"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
  
          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-lime-700 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    );
  };

export default Signup