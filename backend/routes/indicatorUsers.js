// routes/indicatorUsers.js
const express = require("express");
const router = express.Router();
const IndicatorUser = require("../models/IndicatorUser");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = new IndicatorUser({ name, email, phone });
    await newUser.save();
    res.status(201).json({ message: "User data saved successfully" });
  } catch (err) {
    console.error("❌ Error saving form:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
