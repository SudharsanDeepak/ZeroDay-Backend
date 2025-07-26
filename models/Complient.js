const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userType: { type: String, enum: ['Student', 'Warden'], required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String }, // Store image URL or base64 string
  date: { type: String, required: true } // You can use Date type if you want
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);