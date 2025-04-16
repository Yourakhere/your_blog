import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getSingleBlogs,
  updateBlog,
} from "../controller/blog.controller.js";

const router = express.Router();

router.post("/create", createBlog);
router.delete("/delete/:id", deleteBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/my-blog", getMyBlogs);
router.put("/update/:id", updateBlog);
router.get("/single-blog/:id", getSingleBlogs);

export default router;
