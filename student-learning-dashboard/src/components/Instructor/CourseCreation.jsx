import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../services/api';
import { Typography, TextField, Button, Box } from '@mui/material';

const CourseCreation = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [modules, setModules] = useState([]);
  const [moduleTitle, setModuleTitle] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleAddModule = () => {
    if (!moduleTitle.trim()) {
      setError('Please enter a module title.');
      return;
    }
    setModules([...modules, moduleTitle.trim()]); // Store as string
    setModuleTitle('');
    setError('');
  };
  
  const handleSaveCourse = async () => {
    if (!courseTitle.trim() || !courseDescription.trim() || modules.length === 0) {
      setError('Please fill in all fields and add at least one module.');
      return;
    }
  
    const courseData = {
      title: courseTitle.trim(),
      description: courseDescription.trim(),
      modules: modules // Already an array of strings
    };
  
    try {
      const response = await createCourse(courseData);
      console.log('Course saved:', response);
      setSuccess('Course saved successfully!');
      setTimeout(() => navigate('/instructor/course-management'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save course');
    }
  };


  // const handleSaveCourse = async () => {
  //   if (!courseTitle.trim() || !courseDescription.trim() || modules.length === 0) {
  //     setError('Please fill in all fields and add at least one module.');
  //     return;
  //   }

  //   const courseData = {
  //     title: courseTitle.trim(),
  //     description: courseDescription.trim(),
  //     modules: modules // Already an array of strings
  //   };

  //   try {
  //     const response = await createCourse(courseData);
  //     console.log('Course saved:', response);
  //     setError('');
  //     setSuccess('Course saved successfully!');
  //     setTimeout(() => {
  //       navigate('/instructor/course-management');
  //     }, 2000);
  //   } catch (err) {
  //     setError(err.message || 'Failed to save course');
  //     setSuccess('');
  //   }
  // };

  const handleRemoveModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Course
      </Typography>
      
      <TextField
        label="Course Title"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      
      <TextField
        label="Course Description"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Modules</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="Module Title"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button 
            variant="contained" 
            onClick={handleAddModule}
            sx={{ mt: 1, height: '56px' }}
          >
            Add
          </Button>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          {modules.map((module, index) => (
            <Box key={index} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              border: '1px solid #eee',
              borderRadius: 1,
              mt: 1
            }}>
              <Typography>{module}</Typography>
              <Button 
                size="small" 
                color="error"
                onClick={() => handleRemoveModule(index)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      
      {success && (
        <Typography color="success" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
      
      <Button 
        variant="contained" 
        onClick={handleSaveCourse} 
        sx={{ mt: 3 }}
        fullWidth
        size="large"
      >
        Save Course
      </Button>
    </Box>
  );
};

export default CourseCreation;