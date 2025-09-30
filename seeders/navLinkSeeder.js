import mongoose from "mongoose";
import dotenv from "dotenv";
import { navLink } from "../data/navLink.js";
import NavLink from "../models/NavLink.js";
import { connectDB } from "../config/database.js";

dotenv.config();

connectDB();

const importUsers = async () => {
  try {
    await NavLink.deleteMany();
    await NavLink.insertMany(navLink);

    console.log("✅ NavLinks seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding navlinks:", err);
    process.exit(1);
  }
};

importUsers();
