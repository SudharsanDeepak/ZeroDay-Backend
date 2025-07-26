const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// @route   GET /api/skills
// @desc    Get all listed skills
// @access  Private (authMiddleware used in route)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (err) {
    console.error('Error fetching skills:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/skills
// @desc    Add a new skill
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, description, tutor, sessions, image, email } = req.body;

    if (!name || !description || !tutor || !sessions || !email) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    const newSkill = new Skill({
      name,
      description,
      tutor,
      sessions,
      image,
      email,
    });

    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    console.error('Error saving skill:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
