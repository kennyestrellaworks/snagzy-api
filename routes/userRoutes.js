import express from "express";
import User from "../models/User.js";
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET users by gender
router.get("/gender/:gender", async (req, res) => {
  try {
    const genderParam = req.params.gender;
    // Use case-insensitive search so "male" and "Male" both work
    const users = await User.find({
      gender: { $regex: new RegExp("^" + genderParam + "$", "i") },
    });

    if (!users.length) {
      return res
        .status(404)
        .json({ message: "No users found with that gender" });
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
