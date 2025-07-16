const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // URL for service image
  detailedContent: String, // Content for popup
  isActive: { type: Boolean, default: true }
});

const qrSchema = new mongoose.Schema({
  qrCodeUrl: String, // URL for the QR code image
});

module.exports = {
  Service: mongoose.model('Service', serviceSchema),
  QR: mongoose.model('QR', qrSchema),
};
