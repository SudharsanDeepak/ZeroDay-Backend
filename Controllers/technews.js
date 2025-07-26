const express = require('express');
const router = express.Router();
const TechNews = require('../models/TechNews'); // adjust path if needed
const multer = require('multer');

// Store uploaded file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   GET /api/technews
// @desc    Get all tech news
// @access  Private (authMiddleware required in main app.js)
router.get('/', async (req, res) => {
  try {
    const news = await TechNews.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ error: 'Server error fetching news' });
  }
});

// @route   POST /api/technews
// @desc    Create a new tech news entry
// @access  Private
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, author, date, link } = req.body;

    let image = '';
    if (req.file) {
      image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    const newNews = new TechNews({
      title,
      description,
      author,
      date: date || new Date().toISOString().slice(0, 10),
      image,
      link
    });

    await newNews.save();
    res.status(201).json({ message: 'News added', news: newNews });
  } catch (err) {
    console.error('Error saving news:', err);
    res.status(500).json({ error: 'Server error saving news' });
  }
});

module.exports = router;
