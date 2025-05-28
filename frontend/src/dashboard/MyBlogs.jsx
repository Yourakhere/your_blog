import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/blogs/my-blog");
        setMyBlogs(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch blogs.");
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/blogs/delete/${id}`);
      toast.success("Blog deleted successfully");
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900 tracking-wide">
        My Blogs
      </h1>

      {myBlogs.length > 0 ? (
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {myBlogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
              role="article"
            >
              {blog.blogImage?.url ? (
                <img
                  src={blog.blogImage.url}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-400 italic select-none">
                  No Image Available
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-purple-200 text-purple-800 font-medium text-sm tracking-wide">
                  {blog.category}
                </span>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex-grow line-clamp-2">
                  {blog.title}
                </h2>

                <div className="mt-auto flex gap-4">
                  <Link
                    to={`/blog/update/${blog._id}`}
                    className="flex-1 inline-block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    aria-label={`Update blog titled ${blog.title}`}
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex-1 inline-block text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    aria-label={`Delete blog titled ${blog.title}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-24 italic select-none">
          You have not posted any blogs yet.
        </p>
      )}
    </div>
  );
}

export default MyBlogs;
