const mongoose = require('mongoose');

const techNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true }, // store as string (e.g. YYYY-MM-DD) or use Date type if you prefer
  image: { type: String }, // base64 string or image URL
  link: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TechNews', techNewsSchema);