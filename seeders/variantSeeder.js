import mongoose from "mongoose";
import dotenv from "dotenv";
import { variants } from "../data/variants.js";
import Variant from "../models/Variant.js";
import { connectDB } from "../config/database.js";

dotenv.config();

connectDB();

const importUsers = async () => {
  try {
    await Variant.deleteMany();
    await Variant.insertMany(variants);

    console.log("✅ Variants seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding variants:", err);
    process.exit(1);
  }
};

importUsers();
