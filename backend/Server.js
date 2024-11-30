const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const port = 8080;



// Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/todosDB", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection failed:", err));

// // Routes

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// CORS configuration


app.use(cors());

app.use(express.json());

const { connectDB } = require('./db');


(async () => {
  try {
    await connectDB();
    app.use("/api/todos", todoRoutes);
    app.use("/api/auth",require('./Auth'))
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).send('Something went wrong!');
});