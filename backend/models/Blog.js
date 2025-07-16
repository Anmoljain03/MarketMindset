const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  image: String,
  date: String,
  title: String,
  description: String,   // Short desc (card view)
  content: String,       // Full content (explore page)
  category: String,
  link: String,

  author: String,        // ✅ New: Author name
  shortLinks: [String],  // ✅ New: Right side short/related links
  shareLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    whatsapp: String,
  },                     // ✅ New: Share links
});

module.exports = mongoose.model('Blog', blogSchema);
