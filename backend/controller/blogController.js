import Blogs from "../models/blogModel.js";
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().populate("author", "firstname lastname");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id).populate(
      "author",
      "firstname lastname"
    );
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;

    const newBlog = new Blogs({ title, content, author });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", Blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.likedBy.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: "You have already liked this blog" });
    }

    blog.likes += 1;
    blog.likedBy.push(req.user._id);
    if (blog.dislikedBy.includes(req.user._id)) {
      blog.dislikes -= 1;
      blog.dislikedBy.pull(req.user._id);
    }
    await blog.save();

    res.json({
      message: "Blog liked",
      likes: blog.likes,
      dislikes: blog.dislikes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const dislikeBlog = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.dislikedBy.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: "You have already disliked this blog" });
    }

    blog.dislikes += 1;
    blog.dislikedBy.push(req.user._id);
    if (blog.likedBy.includes(req.user._id)) {
      blog.likes -= 1;
      blog.likedBy.pull(req.user._id);
    }
    await blog.save();

    res.json({
      message: "Blog disliked",
      likes: blog.likes,
      dislikes: blog.dislikes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
