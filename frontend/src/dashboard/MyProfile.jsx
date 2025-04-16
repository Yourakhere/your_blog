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
      <div className="flex justify-center items-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
          <div className="relative">
            <img
              src={profile?.user?.photo?.url || "https://via.placeholder.com/500x300"}
              alt="Admin"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={profile?.user?.photo?.url || "https://via.placeholder.com/150"}
                alt="Admin"
                className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
              />
            </div>
          </div>

          <div className="px-6 py-8 mt-2">
            <h2 className="text-center text-2xl font-semibold text-gray-800">
              {profile?.user?.name || "Name not available"}
            </h2>
            <p className="text-center text-gray-600 mt-1">
              {profile?.user?.email || "Email not available"}
            </p>
            <p className="text-center text-gray-600 mt-1">
              {profile?.user?.phone || "98767654321"}
            </p>
            <p className="text-center text-gray-600 mt-1 capitalize">
              {profile?.user?.role || "Role not available"}
            </p>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
              <p className="text-center text-gray-700">
                Welcome, <span className="font-semibold">{profile?.user?.name}</span>! You can upload new blogs, manage your existing posts, and share your thoughts with the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
