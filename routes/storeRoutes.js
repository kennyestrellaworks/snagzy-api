import express from "express";
import Store from "../models/Store.js";
const router = express.Router();

// GET all stores
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET store by ID
router.get("/:id", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET store by ownerId
router.get("/owner/:ownerId", async (req, res) => {
  const { ownerId } = req.params;
  try {
    const stores = await Store.find({ ownerId });
    return res.json(stores);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
