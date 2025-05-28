import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";

function Sidebar({ setComponent, profile, handleLogout }) {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Burger menu button, always visible */}
      <button
        onClick={() => setShow(!show)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition"
        aria-label="Toggle Sidebar"
      >
        <CiMenuBurger className="text-3xl text-gray-700" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300
          ${show ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button inside sidebar */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full"
          aria-label="Close Sidebar"
        >
          <BiSolidLeftArrowAlt className="text-3xl text-gray-700" />
        </button>

        {/* Profile */}
        <div className="text-center mt-16">
          <img
            src={profile?.photo?.url || "https://via.placeholder.com/150?text=No+Image"}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <p className="font-semibold text-lg text-gray-800">{profile?.name || "Loading..."}</p>
        </div>

        {/* Buttons */}
        <div className="mt-10 space-y-4 px-6">
          <button
            onClick={() => {
              setComponent("My Blogs");
              setShow(false);
            }}
            className="w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            My Blogs
          </button>
          <button
            onClick={() => {
              setComponent("Create Blog");
              setShow(false);
            }}
            className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Create Blog
          </button>
          <button
            onClick={() => {
              setComponent("My Profile");
              setShow(false);
            }}
            className="w-full py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
          >
            My Profile
          </button>
          <button
            onClick={() => {
              window.location.href = "/"; // or use navigate from react-router
            }}
            className="w-full py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              handleLogout();
              setShow(false);
            }}
            className="w-full py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay behind sidebar when open */}
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setShow(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}

export default Sidebar;
