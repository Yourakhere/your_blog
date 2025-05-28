import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!title || !category || !about || !blogImage) {
      toast.error("Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    const token = localStorage.getItem("jwtToken");

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage(null);
      setBlogImagePreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-12">
        <h3 className="text-3xl font-extrabold text-indigo-700 mb-10 text-center">
          Create New Blog
        </h3>
        <form onSubmit={handleCreateBlog} className="space-y-8">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-md font-semibold text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-md font-semibold text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
              required
            />
          </div>

          {/* Blog Image */}
          <div>
            <label
              htmlFor="blogImage"
              className="block text-md font-semibold text-gray-700 mb-2"
            >
              Blog Image
            </label>
            <div className="mb-4 flex justify-center">
              <img
                src={
                  blogImagePreview
                    ? blogImagePreview
                    : "https://via.placeholder.com/400x250?text=Blog+Image"
                }
                alt="Blog Preview"
                className="rounded-lg shadow-md max-h-60 object-cover"
              />
            </div>
            <input
              id="blogImage"
              type="file"
              accept="image/*"
              onChange={changePhotoHandler}
              className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
                cursor-pointer"
              required
            />
          </div>

          {/* About */}
          <div>
            <label
              htmlFor="about"
              className="block text-md font-semibold text-gray-700 mb-2"
            >
              About
            </label>
            <textarea
              id="about"
              rows="5"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
