const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['electronics', 'personal', 'vehicles', 'books', 'clothing'], 
    required: true 
  },
  type: { type: String, enum: ['lost', 'found'], required: true },
  location: { type: String, required: true },
  date: { type: String, required: true }, // or Date type if you prefer
  contact: { type: String, required: true },
  phone: { type: String },
  reward: { type: String },
  image: { type: String }, // base64 string
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema);