import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" && <MyProfile />}
      {component === "Create Blog" && <CreateBlog />}
      {component === "Update Blog" && <UpdateBlog />}
      {component === "My Blogs" && <MyBlogs />}
    </div>
  );
}

export default Dashboard;
