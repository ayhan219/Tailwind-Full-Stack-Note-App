const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Provide all information" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Return a success message or the user object
        return res.status(201).json({ msg: "User created successfully", user: savedUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ msg: "Provide all information" });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Return the token and user info (excluding password)
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
