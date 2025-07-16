// models/Indicator.js
const mongoose = require("mongoose");

const indicatorSchema = new mongoose.Schema({
  title: String,
  image: String, // store image URL or local path
  description: String, // full HTML description (including bullets and paras)
  downloadFileUrl: String // file or PDF URL
});

module.exports = mongoose.model("Indicator", indicatorSchema);
