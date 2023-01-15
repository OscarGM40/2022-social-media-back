import { Router } from "express";
import { getLikes, addLike, deleteLike } from "../controllers/likes.controller.js";

const router = Router();
router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", deleteLike);

export default router;
