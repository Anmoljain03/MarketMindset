const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Add subscription
router.post('/add', async (req, res) => {
  const { name, email, planType } = req.body;

  try {
    const newSub = new Subscription({ name, email, planType });
    await newSub.save();
    res.status(201).json({ message: 'Subscription saved', data: newSub });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

// Get all subscriptions
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

// Update subscription (e.g., mark payment as completed)
router.put('/:id', async (req, res) => {
  const { paymentStatus } = req.body;
  try {
    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update subscription' });
  }
});

// Delete a subscription
router.delete('/:id', async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscription deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
});


module.exports = router;
