const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://sece-campus-connect.netlify.app', // your frontend URL
  credentials: true
}));
app.use(express.json());

// Signup route
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, status } = req.body;
    if (!email || !password || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = await User.create({ email, password, status });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, status: user.status },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, status: user.status });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected feature routes
app.use('/api/announcements', authMiddleware, require('./Controllers/announcement'));
app.use('/api/complaints', authMiddleware, require('./Controllers/complaint'));
app.use('/api/lostfound', authMiddleware, require('./Controllers/lostfound'));
app.use('/api/skills', authMiddleware, require('./Controllers/skill'));
app.use('/api/technews', authMiddleware, require('./Controllers/technews.js'));
app.use('/api/timetable', authMiddleware, require('./Controllers/timetable'));

// MongoDB connection and server start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });