// backend/routes/formDataRoutes.js
const express = require("express");
const router = express.Router();
const FormData = require("../models/FormData");

// POST - Save form data
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newEntry = new FormData({ name, email });
    await newEntry.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
