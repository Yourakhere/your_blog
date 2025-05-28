import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          All Blogs
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          The concept of gods varies widely across different cultures, religions, and belief systems.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transform transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h2 className="text-xl font-semibold">{blog?.title}</h2>
                  <p className="text-sm mt-1 uppercase tracking-wide">{blog?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
