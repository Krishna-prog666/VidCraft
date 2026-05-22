const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service:     { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  duration:    { type: String, required: true },   // video length
  budget:      { type: Number, required: true },
  deadline:    { type: Date, required: true },
  status:      { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
  fileUrl:     { type: String, default: '' },
  adminNotes:  { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
