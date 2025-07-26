const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['exams', 'events', 'holidays', 'academic', 'placements'], required: true },
  author: { type: String, required: true },
  date: { type: String, required: true }, // You can use Date type if you want
  time: { type: String, required: true },
  pinned: { type: Boolean, default: false },
  urgent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);