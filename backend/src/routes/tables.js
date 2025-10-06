import express from "express";
import Table from "../models/Table.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const tables = await Table.find().sort({ zone: 1, name: 1 });
    res.status(200).json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ message: "Failed to fetch tables" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.status(200).json(table);
  } catch (error) {
    console.error("Error fetching table:", error);
    res.status(500).json({ message: "Failed to fetch table" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Table not found" });
    }
    
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ message: "Failed to update table" });
  }
});

export default router;
