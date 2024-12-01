const express = require("express");
const cors = require('cors');
require('dotenv').config();
const todoRoutes = require("./routes/todoRoutes");
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
const { connectDB } = require('./db');


(async () => {
  try {
    await connectDB();
    app.use("/api/todos", todoRoutes);
    app.use("/api/auth",require('./Auth'))
    app.use("/api/diary",require('./routes/diaryRoutes'))
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