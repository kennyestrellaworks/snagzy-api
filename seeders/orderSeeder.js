import mongoose from "mongoose";
import dotenv from "dotenv";
import { orders } from "../data/orders.js";
import Order from "../models/Order.js";
import { connectDB } from "../config/database.js";

dotenv.config();

connectDB();

const importUsers = async () => {
  try {
    await Order.deleteMany();
    await Order.insertMany(orders);

    console.log("✅ Orders seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding orders:", err);
    process.exit(1);
  }
};

importUsers();
