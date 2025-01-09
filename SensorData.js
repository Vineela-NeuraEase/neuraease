// SensorData.js
const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  heartRate: { type: Number, required: true },
  stressLevel: { type: Number, required: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
