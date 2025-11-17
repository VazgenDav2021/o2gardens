import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createSchema,
  updateSchema,
  deleteSchema,
  getSchemas,
} from "../controllers/schemaController.js";

const router = express.Router();

router.get("/", getSchemas); // доступно всем
router.post("/", authMiddleware, createSchema);
router.put("/:id", authMiddleware, updateSchema);
router.delete("/:id", authMiddleware, deleteSchema);

export default router;
