const express = require("express");
const { getAllDiaryEntries, getDiaryByDate, saveOrUpdateDiary } = require("../controllers/dairyController");
const router = express.Router();

// Import the DiaryEntry model directly
const DiaryEntry = require("../models/DiaryEntry");

// Get all diary entries
router.get("/", getAllDiaryEntries);

// Get a diary entry by date
router.get("/:date", getDiaryByDate);

// Save or update a diary entry
router.post("/", saveOrUpdateDiary);

// Handle invalid routes for this module
router.use((req, res) => {
  res.status(404).json({ message: "Invalid route" });
});

module.exports = router;