const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const SensorData = require('./models/SensorData');
const UserLog = require('./models/UserLog');
const MeltdownEvent = require('./models/MeltdownEvent');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Environment Variables for Deployment
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI || "mongodb+srv://neuraease:go4NEURAEASE@neuraease.fkza1.mongodb.net/?retryWrites=true&w=majority&appName=neuraease"

// MongoDB Connection
mongoose.connect(dbUri) 
  .then(() => {
    console.log("MongoDB connected successfully!");
    console.log("Connected to database:", mongoose.connection.name);
  }) 
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Neuraease API is running" });
});

app.post('/user-logs', async (req, res) => {
  try {
    const { userId, moodScore, notes } = req.body;
    const log = await UserLog.create({ userId, moodScore, notes });
    console.log('Received log:', log);
    res.json({ success: true, message: 'Log saved successfully', data: log });
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ success: false, error: 'Failed to save log' });
  }
});

app.get('/user-logs', async (req, res) => {
  try {
    const logs = await UserLog.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user logs' });
  }
});

app.post('/meltdown-events', async (req, res) => {
  try {
    const { userId, description } = req.body;
    if (!userId || !description) {
      return res.status(400).json({
        success: false,
        error: 'Both userId and description are required'
      });
    }
    const meltdown = await MeltdownEvent.create({
      userId,
      description
    });
    console.log('Meltdown event logged:', meltdown);
    res.status(201).json({
      success: true,
      message: 'Meltdown event logged successfully',
      data: meltdown
    });
  } catch (error) {
    console.error('Error logging meltdown event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to log meltdown event'
    });
  }
});

app.get('/meltdown-events', async (req, res) => {
  try {
    const events = await MeltdownEvent.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch meltdown events' });
  }
});

app.get('/sensor-data', async (req, res) => {
  try {
    const sensorReadings = await SensorData.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(sensorReadings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});