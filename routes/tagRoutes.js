import express from "express";
import Tag from "../models/Tag.js";
const router = express.Router();

// GET all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
