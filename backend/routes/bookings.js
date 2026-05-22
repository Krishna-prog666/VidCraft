const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Booking = require('../models/Booking');
const { auth, adminAuth } = require('../middleware/auth');
const { sendBookingEmails, sendStatusUpdateEmail } = require('../utils/mailer');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB

// Create booking (user)
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const { service, projectName, description, duration, budget, deadline } = req.body;
    const booking = await Booking.create({
      user: req.user.id, service, projectName, description,
      duration, budget, deadline,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : ''
    });
    await booking.populate(['user', 'service']);

    // Send email notifications
    await sendBookingEmails(booking);

    res.status(201).json(booking);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get user's bookings
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('service', 'title category icon')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get all bookings (admin)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('service', 'title category')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Update booking status (admin)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, adminNotes: req.body.adminNotes || '' },
      { new: true }
    ).populate(['user', 'service']);
    
    // Send status update email to client
    await sendStatusUpdateEmail(booking);

    res.json(booking);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Delete booking (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
