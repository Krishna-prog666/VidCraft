const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ['Basic Edit', 'Color Grading', 'Motion Graphics', 'VFX', 'Short Film', 'YouTube Edit', 'Wedding Film', 'Corporate'], required: true },
  price:       { type: Number, required: true },
  duration:    { type: String, required: true },   // e.g. "3-5 days"
  features:    [{ type: String }],
  isActive:    { type: Boolean, default: true },
  icon:        { type: String, default: '🎬' },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
