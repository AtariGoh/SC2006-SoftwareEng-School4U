const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password, name, mobile, residence } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase
            .from('users')
            .insert([{ username, email, password: hashedPassword, name, mobile, residence }])
            .select();

        if (error) {
            console.error('Error inserting user:', error);
            if (error.code === '23505') {
                return res.status(400).json({ error: "Email already exists" });
            }
            return res.status(400).json({ error: error.message || "Error inserting user" });
        }

        const newUser = data[0];
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username);

        if (users.length === 0) {
            return res.status(404).json({ error: "Invalid username or password" });
        }

        const user = users[0];
        const wordMatch = await bcrypt.compare(password, user.password);
        if (!wordMatch) {
            return res.status(404).json({ error: 'Invalid password' });
        }

        const payload = { userId: user.uuid, userName: user.username };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Logged in successfully' });

    } catch (error) {
        console.error("Error during login", error);
        return res.status(500).json({ error: 'Error during login' });
    }
});

module.exports = router;
