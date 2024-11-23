const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const todoRoutes = require("./routes/todoRoutes");
// const moodRoutes = require("./routes/moodRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/todosDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Routes
app.use("/api/todos", todoRoutes);
// app.use("/api/moods", moodRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));