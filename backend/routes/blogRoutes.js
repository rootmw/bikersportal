import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createBlog,
  dislikeBlog,
  getAllBlogs,
  getBlogById,
  likeBlog,
} from "../controller/blogController.js";

const router = express.Router();

router.get("/blogs", userAuth, getAllBlogs);
router.post("/blogs", userAuth, createBlog);
router.get("/blogs/:id", getBlogById);
router.post("/blogs/:id/like", userAuth, likeBlog);
router.post("/blogs/:id/dislike", userAuth, dislikeBlog);
export default router;
