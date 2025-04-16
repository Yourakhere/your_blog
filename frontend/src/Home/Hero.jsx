import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => (
          <Link
            to={`/blog/${element._id}`}
            key={element._id}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transform hover:-translate-y-1 transition duration-300"
          >
            <div className="relative">
              <img
                src={element.blogImage?.url || "https://via.placeholder.com/300x200?text=No+Image"}
                alt="Blog"
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                <h1 className="text-white text-lg font-bold">
                  {element.title}
                </h1>
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-gray-800 font-semibold">
                {element.adminName || "Latest Blog"}
              </h2>
              <p className="text-gray-400 text-xs">Post by Admin</p>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Loading blogs...</p>
        </div>
      )}
    </div>
  );
}

export default Hero;
