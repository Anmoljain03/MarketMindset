import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  strategyId: String,
  email: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
