import React,{useState} from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from "lucide-react";


const Profile = () => {
  const { user,updateProfile,isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);



  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="flex flex-col items-center w-full max-w-md bg-green-200 rounded-xl shadow-md overflow-hidden">
        
        
        <div className="w-full p-6 bg-green-300 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile</h1>
          <div className="space-y-1 text-gray-700">
            

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || user.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover  "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
              <p className="text-sm text-zinc-400">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
          </div>

            
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        {/* Account Info Section */}
        <div className="w-full p-6 bg-green-400 text-sm text-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-center">Account Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-gray-500 py-2">
              <span>Member Since</span>
              <span>{user.createdAt?.split('T')[0]}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
