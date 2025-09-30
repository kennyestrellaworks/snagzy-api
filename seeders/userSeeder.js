import mongoose from "mongoose";
import dotenv from "dotenv";
import { users } from "../data/users.js";
import User from "../models/User.js";
import { connectDB } from "../config/database.js";

dotenv.config();

connectDB();

const importUsers = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);

    console.log("✅ Users seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
};

importUsers();
