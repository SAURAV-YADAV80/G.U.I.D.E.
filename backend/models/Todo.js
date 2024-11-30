const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  email: {type:String, required: true}
});

module.exports = mongoose.model("Todo", todoSchema);