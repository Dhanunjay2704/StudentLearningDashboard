const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// Create a new course
router.post('/', auth, async (req, res) => {
  const { title, description, modules } = req.body;
  try {
    const course = new Course({ title, description, modules, instructor: req.user.id });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get single course details
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('resources')
      .populate('instructor', 'name email');
      
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// In your routes/courses.js
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('resources', 'title description filePath') // Only populate necessary fields
      .select('-__v'); // Exclude version key
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get detailed course information
router.get('/details/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('resources')
      .populate('instructor', 'name email')
      .lean();

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Add additional analytics data if needed
    const studentCount = await User.countDocuments({ enrolledCourses: req.params.id });
    const completionRate = await calculateCompletionRate(req.params.id); // Implement this helper

    res.json({
      ...course,
      studentCount,
      completionRate
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a course
router.delete('/:id', auth, async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json({ message: 'Course deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update a course
router.put('/:id', auth, async (req, res) => {
    const { title, description, modules } = req.body;
  
    try {
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { title, description, modules },
        { new: true }
      );
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  router.post('/', auth, async (req, res) => {
    const { title, description, modules } = req.body;
    
    try {
      // Validate modules
      if (!Array.isArray(modules)) {
        return res.status(400).json({ error: "Modules must be an array" });
      }
  
      const course = new Course({ 
        title: title.trim(),
        description: description.trim(),
        modules: modules.map(m => m.trim()).filter(m => m), // Clean module strings
        instructor: req.user.id 
      });
  
      await course.save();
      res.status(201).json(course);
    } catch (err) {
      res.status(400).json({ 
        error: err.message,
        details: err.errors 
      });
    }
  });



module.exports = router;