const express = require('express');
const router = express.Router();
const multer = require('multer');
const Resource = require('../models/Resource');
const auth = require('../middleware/auth');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });

// Upload a new resource
router.post('/', auth, upload.single('file'), async (req, res) => {
  const { title, description, course } = req.body;
  const filePath = req.file.path;

  try {
    const resource = new Resource({ title, description, filePath, course });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all resources for a course
router.get('/:courseId', auth, async (req, res) => {
  try {
    const resources = await Resource.find({ course: req.params.courseId });
    res.json(resources);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;