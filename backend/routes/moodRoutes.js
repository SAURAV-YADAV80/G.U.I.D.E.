const express = require('express');
const router = express.Router();
const MoodEntry = require('../models/MoodEntry');

// Get all mood entries for a month
router.get('/:year/:month', async (req, res) => {
  try {
    const { year, month } = req.params;
    const regex = new RegExp(`^${year}-${month.padStart(2, '0')}`); // Matches YYYY-MM

    const moods = await MoodEntry.find({ date: regex });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching mood data', error: err });
  }
});

// Add a new mood entry
router.post('/', async (req, res) => {
  try {
    const { date, score, note } = req.body;

    const newMoodEntry = new MoodEntry({ date, score, note });
    const savedMood = await newMoodEntry.save();

    res.status(201).json(savedMood);
  } catch (err) {
    res.status(400).json({ message: 'Error adding mood entry', error: err });
  }
});

// Delete a mood entry
router.delete('/:timestamp', async (req, res) => {
  try {
    const { timestamp } = req.params;

    const result = await MoodEntry.deleteOne({ timestamp });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    res.json({ message: 'Mood entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting mood entry', error: err });
  }
});

// Get mood colors and labels (for frontend legend)
router.get('/meta/colors', (req, res) => {
  const moodColors = {
    1: { color: 'bg-red-500', light: 'bg-red-100', label: 'Very Sad' },
    2: { color: 'bg-yellow-500', light: 'bg-yellow-100', label: 'Sad' },
    3: { color: 'bg-green-500', light: 'bg-green-100', label: 'Neutral' },
    4: { color: 'bg-blue-500', light: 'bg-blue-100', label: 'Happy' },
    5: { color: 'bg-purple-500', light: 'bg-purple-100', label: 'Very Happy' },
  };

  res.json(moodColors);
});

module.exports = router;