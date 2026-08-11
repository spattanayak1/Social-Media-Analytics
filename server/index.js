const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/retail-social', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/social-media', require('./routes/socialMedia'));
app.use('/api/sentiment', require('./routes/sentiment'));
app.use('/api/trends', require('./routes/trends'));
app.use('/api/brand', require('./routes/brand'));
app.use('/api/competitor', require('./routes/competitor'));
app.use('/api/alerts', require('./routes/alerts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
