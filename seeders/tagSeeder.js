import mongoose from "mongoose";
import dotenv from "dotenv";
import { tags } from "../data/tags.js";
import Tag from "../models/Tag.js";
import { connectDB } from "../config/database.js";

dotenv.config();

connectDB();

const importUsers = async () => {
  try {
    await Tag.deleteMany();
    await Tag.insertMany(tags);

    console.log("✅ Tags seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding tags:", err);
    process.exit(1);
  }
};

importUsers();
