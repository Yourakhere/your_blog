import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/logout",
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const activeLinkStyle =
    "text-blue-600 font-semibold border-b-2 border-blue-600";

  return (
    <nav className="shadow-lg px-6 py-4 bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-bold text-2xl text-gray-800">
          Your<span className="text-green-500">Blogs</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {["/", "/blogs", "/creators", "/about", "/contact"].map((path, i) => {
            const name = path === "/" ? "HOME" : path.replace("/", "").toUpperCase();
            return (
              <li key={i}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? activeLinkStyle : "hover:text-blue-500 transition-colors duration-300"
                  }
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden cursor-pointer text-gray-800" onClick={() => setShow(!show)}>
          {show ? <IoCloseSharp size={28} /> : <AiOutlineMenu size={28} />}
        </div>

        {/* Auth Buttons Desktop */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated && profile?.user?.role === "admin" && (
            <NavLink
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              DASHBOARD
            </NavLink>
          )}

          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              LOGIN
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full animate-slideDown">
          <ul className="flex flex-col space-y-4 py-6 items-center text-lg font-medium text-gray-700">
            {["/", "/blogs", "/creators", "/about", "/contact"].map((path, i) => {
              const name = path === "/" ? "HOME" : path.replace("/", "").toUpperCase();
              return (
                <li key={i}>
                  <NavLink
                    to={path}
                    onClick={() => setShow(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-500 transition-colors duration-300"
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              );
            })}
            <li>
              {isAuthenticated && profile?.user?.role === "admin" && (
                <NavLink
                  to="/dashboard"
                  onClick={() => setShow(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  DASHBOARD
                </NavLink>
              )}
            </li>
            <li>
              {!isAuthenticated ? (
                <NavLink
                  to="/login"
                  onClick={() => setShow(false)}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                  LOGIN
                </NavLink>
              ) : (
                <button
                  onClick={() => {
                    setShow(false);
                    handleLogout(new Event("click"));
                  }}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                  LOGOUT
                </button>
              )}
            </li>
          </ul>
        </div>
      )}

      <style>
        {`
          @keyframes slideDown {
            0% {opacity: 0; transform: translateY(-10px);}
            100% {opacity: 1; transform: translateY(0);}
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease forwards;
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
