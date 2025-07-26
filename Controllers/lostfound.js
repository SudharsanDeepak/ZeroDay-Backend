const express = require('express');
const router = express.Router();
const multer = require('multer');
const LostFound = require('../models/LostFound'); // Adjust path as per your folder structure

// Multer setup for file uploads (store in memory or disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new lost/found item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      date,
      contact,
      phone,
      reward
    } = req.body;

    // Convert image buffer to base64
    let imageBase64 = '';
    if (req.file) {
      imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    const newItem = new LostFound({
      title,
      description,
      category,
      type,
      location,
      date,
      contact,
      phone,
      reward,
      image: imageBase64
    });

    await newItem.save();
    res.status(201).json({ message: 'Item reported successfully', item: newItem });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await LostFound.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

module.exports = router;
