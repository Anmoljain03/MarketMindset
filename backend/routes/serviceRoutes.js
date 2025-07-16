// servicesRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Service, QR } = require('../models/Service');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/services/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const qrUploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/qr/');
  },
  filename: function (req, file, cb) {
    cb(null, 'qr_' + Date.now() + path.extname(file.originalname));
  },
});
const qrUpload = multer({ storage: qrUploadStorage });

// Add or Update Service (Admin)
router.post('/add', upload.single('image'), async (req, res) => {
  const { title, description, detailedContent } = req.body;
  const image = req.file ? `/uploads/services/${req.file.filename}` : '';
  const newService = new Service({ title, description, image, detailedContent });
  await newService.save();
  res.status(201).json(newService);
});

// Get All Active Services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services); // ✅ Sends array
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
  });

  // Update existing service
router.put('/:id', async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete a service
router.delete('/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service deleted' });
});

// Toggle active/inactive
router.put('/toggle/:id', async (req, res) => {
  const service = await Service.findById(req.params.id);
  service.isActive = !service.isActive;
  await service.save();
  res.json(service);
});


// GET QR Code
router.get('/qr', async (req, res) => {
  const qr = await QR.findOne();
  if (!qr) return res.json({});
  res.json(qr);
});


router.post('/qr/update', async (req, res) => {
  const { qrCodeUrl } = req.body;
  await QR.findOneAndUpdate({}, { qrCodeUrl }, { upsert: true });
  res.status(200).json({ message: 'QR code updated successfully' });
});

// POST QR Code Upload
// POST QR Code Upload
router.post('/qr/upload', qrUpload.single('qrImage'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');

    // FIX THIS LINE:
    const qrUrl = `/uploads/qr/${req.file.filename}`; // ✅ Corrected path

    let qr = await QR.findOne();
    if (qr) {
      qr.qrCodeUrl = qrUrl;
      await qr.save();
    } else {
      qr = new QR({ qrCodeUrl: qrUrl });
      await qr.save();
    }

    res.json({ message: 'QR Code updated', qrCodeUrl: qrUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
