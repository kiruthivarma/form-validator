const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb+srv://927622bec100:adminpass@development.ufvcuxu.mongodb.net/?retryWrites=true&w=majority&appName=development')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // create new user
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: { username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});