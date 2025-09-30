import mongoose from "mongoose";
import dotenv from "dotenv";
import { categories } from "../data/categories.js";
import Category from "../models/Category.js";
import { connectDB } from "../config/database.js";

dotenv.config();

connectDB();

const importUsers = async () => {
  try {
    await Category.deleteMany();
    await Category.insertMany(categories);

    console.log("✅ Categories seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding categories:", err);
    process.exit(1);
  }
};

importUsers();
