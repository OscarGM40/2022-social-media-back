import { Router } from "express";
import { addPost, getPosts,deletePost } from "../controllers/posts.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);

export default router;
