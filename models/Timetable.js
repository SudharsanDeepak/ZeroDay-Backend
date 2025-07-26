const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  day: { type: String, required: true },
  slots: [{ type: String, required: true }]
});

const timetableSchema = new mongoose.Schema({
  department: { 
    type: String, 
    enum: ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'], 
    required: true 
  },
  timetable: [slotSchema]
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);