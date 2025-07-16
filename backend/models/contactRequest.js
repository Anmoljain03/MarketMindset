const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, default: 'India' },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  consent: { type: Boolean, required: true },
  connect: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
}, {
  timestamps: true,
});

module.exports = mongoose.model ('ContactRequest', contactRequestSchema);
