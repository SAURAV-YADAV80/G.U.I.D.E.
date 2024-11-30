const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('./db');

// Use a secret key for JWT
const JWT_SECRET = 'k7WJ63l9T#8@fR^eL$1PZz*3QnVXgB&2!YcO5@t!m6Hz7Ukx';

Router.post('/signUp', async (req, res) => {
  try {

    const userCollections = getDb('profiles');
    const { email, password, userName } = req.body;
    const user = await userCollections.findOne({ email });
    
    if (user) return res.status(400).send('User Already Exists !!! Try Logging In');
    const hashedPassword = await bcrypt.hash(password, 12);
    await userCollections.insertOne({ email, password: hashedPassword, userName });
    const payload = { email };
    
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    console.log("AuthToken : ", token);
    res.status(200).json({ msg: 'User Successfully Signed Up !!!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

Router.post('/logIn', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCollections = getDb('profiles');

    const user = await userCollections.findOne({ email });
    if (!user) return res.status(400).send('User not Found !!! ');
    


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Password is Incorrect !!! ');

    const payload = { email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    console.log("AuthToken : ", token);

    res.status(200).json({ msg: 'Logged In successfully !!!' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = Router;
