import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.user) {
      setLoading(false);
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="text-indigo-600 text-lg font-medium animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden max-w-md w-full">
        {/* Cover photo */}
        <div className="relative h-48">
          <img
            src={profile?.user?.photo?.url || "https://via.placeholder.com/600x200?text=Profile+Cover"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {/* Profile picture */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={profile?.user?.photo?.url || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
        </div>

        {/* Profile details */}
        <div className="pt-16 pb-8 px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {profile?.user?.name || "Name not available"}
          </h2>
          <p className="text-gray-600 mt-2">{profile?.user?.email || "Email not available"}</p>
          <p className="text-gray-600 mt-1">{profile?.user?.phone || "Phone not available"}</p>
          <p className="text-indigo-600 font-semibold mt-3 capitalize">
            {profile?.user?.role || "Role not available"}
          </p>

          <div className="mt-6 bg-indigo-100 text-indigo-800 p-4 rounded-lg shadow-inner">
            <p>
              Welcome, <span className="font-semibold">{profile?.user?.name}</span>! You can upload new blogs, manage your existing posts, and share your thoughts with the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
