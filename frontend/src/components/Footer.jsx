import React from "react";
import { FaGithub } from "react-icons/fa"; 
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="border py-10">
        
      </footer>
      <div className=" container mx-auto  flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold hidden md:flex">
          Your<span className="text-green-500 font-bold">Blog</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>&copy; 2025 Abhishek kumar All rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#">
            <FaGithub className="h-6" />
          </a> 
          <a href="#">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
