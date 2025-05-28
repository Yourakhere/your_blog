import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");

  return (
    <section className="container mx-auto my-12 px-4">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Devotional Blogs
      </h1>
      <p className="max-w-3xl mx-auto text-center text-gray-600 mb-12">
        The concept of gods varies widely across different cultures, religions, and belief systems.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {devotionalBlogs && devotionalBlogs.length > 0 ? (
          devotionalBlogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 bg-white"
            >
              <div className="relative h-56 overflow-hidden rounded-t-lg">
                <img
                  src={blog?.blogImage?.url || "/default-image.jpg"}
                  alt={blog?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 truncate">{blog?.title}</h2>
                <p className="mt-1 text-sm text-green-600 font-medium uppercase tracking-wide">
                  {blog?.category}
                </p>
                <p className="mt-2 text-gray-700 line-clamp-3">
                  {blog?.description || "No description available."}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center text-gray-500 text-lg">
            Loading devotional blogs...
          </div>
        )}
      </div>
    </section>
  );
}

export default Devotional;
