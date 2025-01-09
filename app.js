const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Environment Variables for Deployment
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI || "mongodb+srv://neuraease:go4NEURAEASE@neuraease.fkza1.mongodb.net/?retryWrites=true&w=majority&appName=neuraease"

// MongoDB Connection
mongoose.connect(dbUri)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.post('/user-logs', async (req, res) => {
  try {
    const { userId, moodScore, notes } = req.body;
    // Your existing logic for saving to MongoDB
    console.log('Received log:', { userId, moodScore, notes });
    res.json({ success: true, message: 'Log saved successfully' });
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ success: false, error: 'Failed to save log' });
  }
});

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});