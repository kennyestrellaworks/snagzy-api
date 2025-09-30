import express from "express";
import NavLink from "../models/NavLink.js";
const router = express.Router();

// GET all nav links
router.get("/", async (req, res) => {
  try {
    const navLinks = await NavLink.find();
    res.json(navLinks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET nav link by ID
router.get("/:id", async (req, res) => {
  try {
    const navLink = await NavLink.findById(req.params.id);
    if (!navLink)
      return res.status(404).json({ message: "Nav link not found" });
    res.json(navLink);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
