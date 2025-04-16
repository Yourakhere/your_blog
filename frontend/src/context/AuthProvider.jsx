import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for profile and blogs

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Retrieve token
        if (token) {
          const { data } = await axios.get(
            "https://your-blog-alpha.vercel.app/api/users/my-profile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (data.user) {
            setProfile(data.user); // Set the user profile if available
            setIsAuthenticated(true); // Update authentication status
          }
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      } finally {
        setLoading(false); // Finish loading state
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs", {
          withCredentials: true,
        });
        setBlogs(data); // Set the blogs data
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
