import express from "express";
import Variant from "../models/Variant.js";
const router = express.Router();

// GET all variants
router.get("/", async (req, res) => {
  try {
    const variant = await Variant.find();
    res.json(variant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET variant by ID
router.get("/:id", async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);
    if (!variant) return res.status(404).json({ message: "Variant not found" });
    res.json(variant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
