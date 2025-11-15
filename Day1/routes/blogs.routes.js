import { Router } from "express";
import { addBlog, addComment, getAllBlogs, getBlogById, getCommentsByBlog } from "../controllers/blog/user.controller.js";

const blogsRouter=Router();

blogsRouter.post('/add-blog',addBlog)
blogsRouter.get('/get-blogs',getAllBlogs)
blogsRouter.get('/:id',getBlogById)

blogsRouter.post('/:blogId/add-comment',addComment)
blogsRouter.get("/:blogId/comments", getCommentsByBlog);


export default blogsRouter;