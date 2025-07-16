const express = require('express');
const router = express.Router();
const Strategy = require('../models/Strategy');

// Get strategies by subcategory
router.get('/by-subcategory/:id', async (req, res) => {
  try {
    const strategies = await Strategy.find({ subCategoryId: req.params.id });
    res.json(strategies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
