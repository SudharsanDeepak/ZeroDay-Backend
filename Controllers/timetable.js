const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// Get timetable for a department
router.get('/:department', async (req, res) => {
  try {
    const { department } = req.params;
    const timetable = await Timetable.findOne({ department });
    res.json(timetable ? timetable.timetable : []);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new day to a department's timetable
router.post('/:department', async (req, res) => {
  try {
    const { department } = req.params;
    const { day, slots } = req.body;
    let timetable = await Timetable.findOne({ department });
    if (!timetable) {
      timetable = new Timetable({ department, timetable: [] });
    }
    timetable.timetable.push({ day, slots });
    await timetable.save();
    res.json(timetable.timetable);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a slot in a department's timetable
router.put('/:department/:day/:slotIdx', async (req, res) => {
  try {
    const { department, day, slotIdx } = req.params;
    const { value } = req.body;
    const timetable = await Timetable.findOne({ department });
    if (!timetable) return res.status(404).json({ error: 'Not found' });
    const dayObj = timetable.timetable.find(d => d.day === day);
    if (!dayObj) return res.status(404).json({ error: 'Day not found' });
    dayObj.slots[slotIdx] = value;
    await timetable.save();
    res.json(timetable.timetable);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;