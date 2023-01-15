import { Router } from "express";
import {
  getRelationships,
  addRelationship,
  deleteRelationship,
} from "../controllers/relationships.controller.js";

const router = Router();

router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
