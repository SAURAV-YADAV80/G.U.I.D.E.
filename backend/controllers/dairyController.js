// controllers/dairyController.js
const DiaryEntry = require("../models/DiaryEntry");

const getAllDiaryEntries = async (req, res) => {
  try {
    const diaries = await DiaryEntry.find().sort({ date: -1 }); // Sort by date descending
    res.status(200).json(diaries);
  } catch (error) {
    console.error("Error fetching diary entries:", error.message);
    res.status(500).json({ message: "Failed to fetch diary entries", error: error.message });
  }
};

const getDiaryByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const diary = await DiaryEntry.findOne({ date });
    if (!diary) {
      return res.status(404).json({ message: "Diary not found for the given date" });
    }
    res.status(200).json(diary);
  } catch (error) {
    console.error(`Error fetching diary for date ${date}:`, error.message);
    res.status(500).json({ message: "Failed to fetch the diary", error: error.message });
  }
};

const saveOrUpdateDiary = async (req, res) => {
  const { date, text } = req.body;

  if (!date || !text) {
    return res.status(400).json({ message: "Date and text are required" });
  }

  try {
    let diary = await DiaryEntry.findOne({ date });

    if (diary) {
      // Update existing diary
      diary.text = text;
      await diary.save();
      return res.status(200).json({ message: "Diary updated successfully", diary });
    }

    // Create new diary entry
    diary = new DiaryEntry({ date, text });
    await diary.save();
    res.status(201).json({ message: "Diary saved successfully", diary });
  } catch (error) {
    console.error("Error saving or updating diary:", error.message);
    res.status(500).json({ message: "Failed to save the diary", error: error.message });
  }
};

module.exports = { getAllDiaryEntries, getDiaryByDate, saveOrUpdateDiary };