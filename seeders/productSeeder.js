import mongoose from "mongoose";
import dotenv from "dotenv";
import { products } from "../data/products.js";
import Product from "../models/Product.js";
import { connectDB } from "../config/database.js";

dotenv.config();

connectDB();

const importUsers = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding products:", err);
    process.exit(1);
  }
};

importUsers();
