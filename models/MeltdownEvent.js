const mongoose = require('mongoose');

const meltdownEventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MeltdownEvent', meltdownEventSchema);