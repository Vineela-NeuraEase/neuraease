const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  // Added this line if you don't already have it

// 1) Connect to MongoDB
require('./db.js');  // This ensures db.js is executed, which connects to MongoDB

// 2) Import our model
const SensorData = require('./SensorData');

// Add the new UserLog schema
const userLogSchema = new mongoose.Schema({
  userId: String,
  moodScore: Number,  // e.g., scale 1-10
  notes: String,
  timestamp: { type: Date, default: Date.now }
});

const UserLog = mongoose.model('UserLog', userLogSchema);

// 3) Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST endpoint to store sensor data
app.post('/sensor-data', async (req, res) => {
  try {
    const { userId, heartRate, stressLevel } = req.body;
    // Save a new SensorData document
    const newReading = await SensorData.create({ userId, heartRate, stressLevel });
    res.status(201).json({ message: 'Data saved', data: newReading });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New POST endpoint for user logs
app.post('/user-logs', async (req, res) => {
  try {
    const { userId, moodScore, notes } = req.body;
    const logEntry = await UserLog.create({ userId, moodScore, notes });
    res.status(201).json({ message: 'Status logged!', data: logEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log status' });
  }
});

app.get('/prediction', async (req, res) => {
  try {
    // For now, let's just fetch the most recent SensorData entry
    const latest = await SensorData.findOne().sort({ timestamp: -1 });

    if (!latest) {
      return res.status(200).json({
        meltdownRisk: "UNKNOWN",
        message: "No data found"
      });
    }

    // Simple threshold logic:
    // e.g., meltdown risk is HIGH if heartRate > 100 or stressLevel > 5
    let meltdownRisk = "LOW";
    if (latest.heartRate > 100 || (latest.stressLevel && latest.stressLevel > 5)) {
      meltdownRisk = "HIGH";
    }

    // Respond with the meltdownRisk and the latest reading
    res.status(200).json({
      meltdownRisk,
      latestReading: latest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Just to confirm server is running
app.listen(3000, () => {
  console.log('Backend running on port 3000');
});