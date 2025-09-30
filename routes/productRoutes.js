import express from "express";
import Product from "../models/Product.js";
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all products by storeId
router.get("/store/:storeId", async (req, res) => {
  const { storeId } = req.params;
  try {
    const products = await Product.find({ storeId });
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get all products by ownerId
router.get("/owner/:ownerId", async (req, res) => {
  const { ownerId } = req.params;
  try {
    const products = await Product.find({ ownerId });
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
