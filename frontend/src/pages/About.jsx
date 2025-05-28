import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();

  return (
    <div className="max-w-3xl mx-auto my-16 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">About Me</h1>

      <p className="text-gray-800 mb-6">
        Hi, I’m{" "}
        <strong className="text-green-600">{profile?.user?.name}</strong>, a passionate MERN stack developer focused on building scalable and performant web applications.
      </p>

      <h2 className="text-xl font-semibold text-green-600 mb-3 border-l-4 border-green-400 pl-3">
        Skills
      </h2>
      <p className="text-gray-700 mb-6">
        MongoDB, Express.js, React.js, Node.js <br />
        REST APIs, JWT Authentication, Responsive Design
      </p>

      <h2 className="text-xl font-semibold text-green-600 mb-3 border-l-4 border-green-400 pl-3">
        Highlights
      </h2>
      <p className="text-gray-700 mb-6">
        Delivered full-stack projects with clean code and strong problem-solving. Continuously improving and exploring new technologies.
      </p>

      <h2 className="text-xl font-semibold text-green-600 mb-3 border-l-4 border-green-400 pl-3">
        Portfolio
      </h2>
      <p className="text-green-700 underline hover:text-green-900 cursor-pointer">
        <a href="https://yourakhere.vercel.app/" target="_blank" rel="noopener noreferrer">
          https://yourakhere.vercel.app/
        </a>
      </p>
    </div>
  );
}

export default About;
