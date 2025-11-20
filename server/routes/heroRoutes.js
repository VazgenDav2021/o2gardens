import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getHeroImages,
  createHeroImage,
  updateHeroImage,
  deleteHeroImage,
} from "../controllers/heroController.js";

const router = express.Router();

router.get("/", getHeroImages);

router.post("/", authMiddleware, createHeroImage);
router.put("/:id", authMiddleware, updateHeroImage);
router.delete("/:id", authMiddleware, deleteHeroImage);

export default router;
