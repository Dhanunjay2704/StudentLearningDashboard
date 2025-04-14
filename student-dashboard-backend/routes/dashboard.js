const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Resource = require('../models/Resource');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// Fetch dashboard data
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });
    const resources = await Resource.find({ course: { $in: courses.map(course => course._id) } });
    const notifications = await Notification.find({ instructor: req.user.id }).sort({ createdAt: -1 }).limit(5);

    res.json({
      courses,
      resources,
      notifications,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;