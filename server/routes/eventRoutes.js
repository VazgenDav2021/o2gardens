import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventById,
} from "../controllers/eventController.js";

const router = express.Router();

// Гость может получать список событий и отдельное событие
router.get("/", getEvents);
router.get("/:id", getEventById);

// Только админ
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;
