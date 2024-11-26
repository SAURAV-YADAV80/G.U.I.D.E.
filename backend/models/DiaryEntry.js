// models/DiaryEntry.js
const mongoose = require("mongoose");

const diaryEntrySchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  text: { type: String, required: true },
});

// Here we simply return the model from the default connection
module.exports = mongoose.model("DiaryEntry", diaryEntrySchema);
