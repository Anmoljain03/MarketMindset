const mongoose = require('mongoose');

const strategySchema = new mongoose.Schema({
  title: String,
  description: String,
  shortDescription: String,
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
  image: String, // ✅ this is important
  isPremium: Boolean,
  price: Number,
  shareLink: String,  
}
);

module.exports = mongoose.model('Strategy', strategySchema);
