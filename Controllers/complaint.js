// routes/complaint.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complient');

// @route   GET /api/complaints
// @desc    Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/complaints
// @desc    Create a new complaint
router.post('/', async (req, res) => {
  try {
    const { userType, name, message, image, date } = req.body;
    if (!userType || !name || !message || !date) {
      return res.status(400).json({ error: 'All fields except image are required' });
    }

    const newComplaint = new Complaint({ userType, name, message, image, date });
    const saved = await newComplaint.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
