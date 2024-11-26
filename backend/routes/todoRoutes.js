const express = require("express");
const { getTodos, addTodo, updateTodo, deleteTodo } = require("../controllers/todoController");

const router = express.Router();

// Define the routes
router.get("/", getTodos);  // Fetch all todos
router.post("/", addTodo);  // Add a new todo
router.patch("/:id", updateTodo);  // Update a todo
router.delete("/:id", deleteTodo);  // Delete a todo

module.exports = router;
