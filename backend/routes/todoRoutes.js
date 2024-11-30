const express = require("express");
const {getDb} =require('../db');

const { ObjectId } = require('mongodb');
const router = express.Router();

router.post('/getTodos', async (req, res) => {
    try {
        const { email } = req.body; 
        const userCollections = getDb('todos');
        const todos = await userCollections.find({ email }).toArray(); 
        console.log(todos);
        if (todos.length === 0) {
            return res.status(200).json({todos:[]});
        }
        console.log(todos);
        res.status(200).json({ todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/addTodo', async (req, res) => {
    const { text, email } = req.body;
    try {
        const userCollections = getDb('todos');
        const newTodo = {
            text,
            completed: false,
            email, 
            createdAt: new Date(),
        };
        const result = await userCollections.insertOne(newTodo);
        res.status(201).json(result.ops[0]);  // Return the added todo
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.patch('/updateTodo/:id', async (req, res) => {
    const { id } = req.params;  
    const { text, completed } = req.body; 
    try {
        const userCollections = getDb('todos');  
        const todo = await userCollections.findOne({ _id: new ObjectId(id) });  
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });  
        }
        if (text !== undefined) {
            todo.text = text;
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }
        const updatedTodo = await userCollections.updateOne(
            { _id: new ObjectId(id) },
            { $set: todo }
        );        
        res.status(200).json({ message: "Todo updated successfully", updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });  
    }
});

router.delete('/deleteTodo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userCollections = getDb('todos');
        const result = await userCollections.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully", id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.patch('/toggleTodo/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;  // The new completed value
    try {
        const userCollections = getDb('todos');
        const todo = await userCollections.findOne({ _id: new ObjectId(id) });
        const updatedTodo = await userCollections.updateOne(
            { _id: new ObjectId(id) },
            { $set: { completed: !todo.completed } }
        );
        res.status(200).json({ message: "Todo completed status toggled", updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
