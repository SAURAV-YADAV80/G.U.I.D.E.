const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);
