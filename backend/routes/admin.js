const router = require('express').Router();
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const { adminAuth } = require('../middleware/auth');

// Dashboard analytics
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const [totalUsers, totalServices, totalBookings, totalMessages,
           pendingBookings, inProgressBookings, completedBookings, unreadMessages] =
      await Promise.all([
        User.countDocuments({ role: 'user' }),
        Service.countDocuments({ isActive: true }),
        Booking.countDocuments(),
        Contact.countDocuments(),
        Booking.countDocuments({ status: 'Pending' }),
        Booking.countDocuments({ status: 'In Progress' }),
        Booking.countDocuments({ status: 'Completed' }),
        Contact.countDocuments({ isRead: false }),
      ]);

    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate('service', 'title')
      .sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: { totalUsers, totalServices, totalBookings, totalMessages,
               pendingBookings, inProgressBookings, completedBookings, unreadMessages },
      recentBookings
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Seed sample services
router.post('/seed-services', adminAuth, async (req, res) => {
  try {
    const count = await Service.countDocuments();
    if (count > 0) return res.json({ message: 'Services already seeded' });

    await Service.insertMany([
      { title: 'Basic Video Edit', description: 'Simple cuts, transitions, and color correction for your videos.', category: 'Basic Edit', price: 49, duration: '2-3 days', features: ['Cuts & Transitions', 'Basic Color Correction', 'Background Music', 'HD Export'], icon: '✂️' },
      { title: 'YouTube Channel Edit', description: 'Professional edits optimized for YouTube growth and engagement.', category: 'YouTube Edit', price: 99, duration: '3-5 days', features: ['Intro & Outro', 'Thumbnails', 'Chapters & Timestamps', 'SEO Optimized'], icon: '📺' },
      { title: 'Color Grading Pro', description: 'Cinematic color grading to make your footage look stunning.', category: 'Color Grading', price: 149, duration: '2-4 days', features: ['LUT Application', 'Skin Tone Correction', 'Scene Matching', 'RAW Processing'], icon: '🎨' },
      { title: 'Motion Graphics Pack', description: 'Custom animations, lower thirds, and motion graphics.', category: 'Motion Graphics', price: 199, duration: '5-7 days', features: ['Custom Animations', 'Lower Thirds', 'Logo Animation', 'Title Cards'], icon: '⚡' },
      { title: 'Wedding Film Edit', description: 'Beautiful cinematic edits for your most special day.', category: 'Wedding Film', price: 299, duration: '7-10 days', features: ['Highlight Reel', 'Full Ceremony Edit', 'Drone Footage', 'Multiple Deliverables'], icon: '💍' },
      { title: 'VFX & Special Effects', description: 'Stunning visual effects to elevate your production quality.', category: 'VFX', price: 399, duration: '7-14 days', features: ['Green Screen Removal', 'VFX Compositing', 'Particle Effects', '4K Output'], icon: '🚀' },
    ]);
    res.json({ message: '6 services seeded successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
