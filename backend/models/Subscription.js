const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  planType: { type: String, enum: ["Monthly", "Yearly"], required: true },
  paymentStatus: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  paymentId: String, // for future use
} , { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);
