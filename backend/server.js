const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');





const strategyRoutes = require('./routes/strategyRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); 
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminAuth = require('./routes/adminAuth');
const adminRoutes = require('./routes/adminRoutes');
const planRoutes = require('./routes/planRoutes');
const contact = require('./routes/contact');
const blogRoutes = require('./routes/blogRoutes');
const formDataRoutes = require("./routes/formDataRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const indicatorRoutes = require('./routes/indicatorRoutes'); 
const indicatorUsersRoutes = require("./routes/indicatorUsers");




const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://marketmindset-1.onrender.com'],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.download(filePath); // This will force download with original file name
});



// Test route
app.get('/', (req, res) => {
  res.send('MarketMindest API Running');
});


// Routes
app.use('/api/strategies', strategyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminAuth);
app.use('/api/admin', adminRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/contact', contact);
app.use('/api/blogs', blogRoutes);
app.use("/api/formdata", formDataRoutes);
app.use("/api/payment",paymentRoutes);
app.use('/api/strategy', strategyRoutes);
app.use('/api/indicators', indicatorRoutes);
app.use("/api/indicator-users", indicatorUsersRoutes);  




// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
});
