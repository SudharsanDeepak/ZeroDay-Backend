const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tutor: { type: String, required: true },
  sessions: { type: Number, required: true },
  image: { type: String }, // base64 string or image URL
  email: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);