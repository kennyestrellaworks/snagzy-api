import mongoose from "mongoose";
import dotenv from "dotenv";
import { stores } from "../data/stores.js";
import Store from "../models/Store.js";
import { connectDB } from "../config/database.js";

dotenv.config();

connectDB();

const importUsers = async () => {
  try {
    await Store.deleteMany();
    await Store.insertMany(stores);

    console.log("✅ Stores seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding stores:", err);
    process.exit(1);
  }
};

importUsers();
