// routes/adminAuth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();
const protect = require('../middleware/auth');
const adminAuth = require('../middleware/auth');

// Register Admin (run once or protect with env key)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const admin = new Admin({ email, password });
  await admin.save();
  res.status(201).json({ message: "Admin registered successfully" });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome Admin ${req.admin.id}` });
});

router.get('/dashboard-data', adminAuth, (req, res) => {
  res.json({ message: 'This is protected dashboard data for admin.' });
});


module.exports = router;
