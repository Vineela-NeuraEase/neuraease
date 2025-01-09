// db.js
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://neuraease:go4NEURAEASE@neuraease.fkza1.mongodb.net/?retryWrites=true&w=majority&appName=neuraease"
)
  .then(() => {
    console.log('MongoDB connected!');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
