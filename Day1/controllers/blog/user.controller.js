import  Blog  from "../../models/blog.model.js";
import  {Comment}  from "../../models/comment.model.js";

export const addBlog = async (req, res) => {
  try {
    const { title, username, description } = req.body;

    if (!title || !username || !description) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newBlog = new Blog({ title, username, description });
    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog added successfully!",
      blog: newBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding blog.",
      error: error.message,
    });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    console.log(blogs)
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching blogs", error: error.message });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ➕ Add new comment or reply
export const addComment = async (req, res) => {
  try {
    const {blogId} = req.params
    const {  username, text, parentCommentId = null } = req.body;

    if (!blogId || !username || !text) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const newComment = new Comment({ blogId, username, text, parentCommentId });
    await newComment.save();

    res.status(201).json({ success: true, message: "Comment added", comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).lean();

    // build nested structure
    const commentMap = {};
    comments.forEach((c) => (commentMap[c._id] = { ...c, replies: [] }));

    const nested = [];
    comments.forEach((c) => {
      if (c.parentCommentId) {
        commentMap[c.parentCommentId]?.replies.push(commentMap[c._id]);
      } else {
        nested.push(commentMap[c._id]);
      }
    });

    res.json({ success: true, comments: nested });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

