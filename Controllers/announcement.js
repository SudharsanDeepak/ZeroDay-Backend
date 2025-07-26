// Controllers/announcement.js
const express = require('express')
const router = express.Router()
const Announcement = require('../models/Announcement') // your Mongoose model

// GET all announcements
router.get('/', async (req, res) => {
  const all = await Announcement.find().sort({ pinned: -1, date: -1 })
  res.json(all)
})

// POST new announcement
router.post('/', async (req, res) => {
  const newAnn = new Announcement(req.body)
  const saved = await newAnn.save()
  res.json(saved)
})

module.exports = router
