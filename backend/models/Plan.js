const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  type: { type: String, enum: ["Monthly", "Yearly"], required: true },
  price: Number,
  description: String,
});

module.exports = mongoose.model("Plan", planSchema);
