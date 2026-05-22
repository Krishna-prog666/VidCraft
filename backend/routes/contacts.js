const router = require('express').Router();
const Contact = require('../models/Contact');
const { adminAuth } = require('../middleware/auth');


// Submit contact (public)
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);


    res.status(201).json({ message: 'Message sent successfully!', contact });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get all contacts (admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Mark as read & add reply (admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true, reply: req.body.reply || '' },
      { new: true }
    );
    res.json(contact);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Delete contact (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
