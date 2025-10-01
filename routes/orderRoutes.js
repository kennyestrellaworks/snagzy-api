import express from "express";
import Order from "../models/Order.js";
const router = express.Router();

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET orders by buyerId
router.get("/buyer/:buyerId", async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.params.buyerId });
    if (!orders.length)
      return res
        .status(404)
        .json({ message: "No orders found for this buyer" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET orders by productId (inside items array)
router.get("/product/:productId", async (req, res) => {
  try {
    const orders = await Order.find({
      "items.productId": req.params.productId,
    });
    if (!orders.length)
      return res
        .status(404)
        .json({ message: "No orders found for this product" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET orders by status
router.get("/status/:status", async (req, res) => {
  try {
    const orders = await Order.find({ status: req.params.status });
    if (!orders.length)
      return res
        .status(404)
        .json({ message: "No orders found with this status" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET orders by paymentStatus
router.get("/payment-status/:paymentStatus", async (req, res) => {
  try {
    const orders = await Order.find({
      paymentStatus: req.params.paymentStatus,
    });
    if (!orders.length)
      return res
        .status(404)
        .json({ message: "No orders found with this payment status" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
