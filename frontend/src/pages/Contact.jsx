import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-16">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl p-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Contact Information
        </h2>
        <ul className="space-y-8">
          {[
            {
              icon: <FaPhone />,
              title: "Phone",
              info: "+91 6283575023",
              color: "green",
            },
            {
              icon: <FaEnvelope />,
              title: "Email",
              info: "help@yourakhere.vercel.app",
              color: "pink",
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Location",
              info: "Punjab, LDH, India",
              color: "green",
            },
          ].map(({ icon, title, info, color }, idx) => (
            <li
              key={idx}
              className={`flex items-center space-x-4 cursor-pointer rounded-lg p-3 transform transition-transform duration-300 ease-in-out 
              hover:scale-110 hover:bg-${color}-50`}
            >
              <div
                className={`text-${color}-600 text-3xl transition-colors duration-300 hover:text-${color}-800`}
              >
                {icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600">{info}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;
