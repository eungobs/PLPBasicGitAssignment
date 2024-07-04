// authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username already exists
        let existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        // Create new user instance
        const newUser = new User({ username, password });

        // Save user to database
        await newUser.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Validate password
        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Successful login
        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
