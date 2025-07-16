// adminRoutes.js
const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Strategy = require('../models/Strategy');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Must match static folder path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  cb(null, isValid);
};

const upload = multer({ storage, fileFilter });

// Get Subscribers Count
router.get('/subscribers', async (req, res) => {
  const count = await Subscription.countDocuments();
  res.json({ count });
});

// Get Plans Count
router.get('/plans', async (req, res) => {
  const count = await Plan.countDocuments();
  res.json({ count });
});


// ✅ Add Category
router.post('/category', async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add SubCategory
router.post('/subcategory', async (req, res) => {
  try {
    const sub = new SubCategory({
      name: req.body.name,
      categoryId: req.body.categoryId,
    });
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all subcategories
router.get('/subcategory', async (req, res) => {
  try {
    const subs = await SubCategory.find().populate('categoryId', 'name'); // Optional: populate category name
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ✅ Add Strategy (box item)
router.post('/strategy', upload.single('image'), async (req, res) => {
  try {
    console.log('Uploaded file:', req.file); // ✅ Check this in terminal

    const { title, description, subCategoryId, isPremium, price } = req.body;

    const newStrategy = new Strategy({
      title,
      description,
      subCategoryId,
      isPremium,
      price,
      image: req.file ? req.file.filename : null,
      shortDescription: description.substring(0, 100) + '...',
      shareLink:req.body.shareLink ,
    });

    await newStrategy.save();
    res.status(200).json(newStrategy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add strategy' });
  }
});

// 🔹 Get subcategories by category ID
router.get('/subcategory/:categoryId', async (req, res) => {
  try {
    const subs = await SubCategory.find({ categoryId: req.params.categoryId });
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Get single strategy by ID
router.get('/strategy/:id', async (req, res) => {
  try {
    const strategy = await Strategy.findById(req.params.id);
    if (!strategy) {
      return res.status(404).json({ error: 'Strategy not found' });
    }
    res.status(200).json(strategy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Get All Categories (needed for dropdown)
router.get('/category', async (req, res) => {
  try {
    const categories = await Category.find(); // assuming Mongoose
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
