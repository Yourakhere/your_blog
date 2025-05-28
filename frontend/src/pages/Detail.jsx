import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setBlogs(data);
      } catch (error) {
        toast.error("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!blogs) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Blog not found.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-blue-600 uppercase text-sm font-semibold mb-4 tracking-wider">
          {blogs?.category}
        </div>
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
          {blogs?.title}
        </h1>
        <div className="flex items-center mb-10">
          <p className="text-lg font-medium text-gray-800">{blogs?.adminName}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {blogs?.blogImage && (
            <img
              src={blogs.blogImage.url}
              alt="blog"
              className="md:w-1/2 w-full rounded-lg shadow-lg object-cover border cursor-pointer max-h-[500px]"
            />
          )}
          <div className="md:w-1/2 w-full text-gray-700 text-lg leading-relaxed">
            {blogs?.about}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detail;
