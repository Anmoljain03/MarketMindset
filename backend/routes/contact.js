const express = require('express');
const router = express.Router();
const ContactRequest = require ('../models/contactRequest');    


// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newRequest = new ContactRequest(data);
    await newRequest.save();
    res.status(201).json({ success: true, message: 'Form submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
