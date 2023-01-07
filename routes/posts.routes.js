import { Router } from "express";
import { addPost, getPosts } from "../controllers/posts.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", addPost);

export default router;
