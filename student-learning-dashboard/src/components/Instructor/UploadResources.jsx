import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { uploadResource, getResources, getCourses } from '../../services/api';

const UploadResources = () => {
  // State for form fields
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // State for resources and courses
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };
    fetchCourses();
  }, []);

  // Fetch resources for the selected course
  useEffect(() => {
    if (selectedCourse) {
      const fetchResources = async () => {
        try {
          const data = await getResources(selectedCourse);
          setResources(data);
        } catch (err) {
          console.error('Failed to fetch resources:', err);
        }
      };
      fetchResources();
    }
  }, [selectedCourse]);

  // Handle file upload
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle saving a resource
  const handleSaveResource = async () => {
    if (!resourceTitle || !resourceDescription || !selectedCourse || !file) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    const resourceData = {
      title: resourceTitle,
      description: resourceDescription,
      course: selectedCourse,
      file,
    };

    try {
      const response = await uploadResource(resourceData);
      console.log('Resource uploaded:', response);
      setResources([...resources, response]); // Add the new resource to the list
      setResourceTitle(''); // Clear the form fields
      setResourceDescription('');
      setFile(null);
      setUploadProgress(0);
    } catch (err) {
      console.error('Failed to upload resource:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Upload Resources
      </Typography>
      <Box sx={{ mt: 3 }}>
        {/* Resource Title */}
        <TextField
          fullWidth
          label="Resource Title"
          variant="outlined"
          value={resourceTitle}
          onChange={(e) => setResourceTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Resource Description */}
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={resourceDescription}
          onChange={(e) => setResourceDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Course Selection Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Assign to Course</InputLabel>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            label="Assign to Course"
          >
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* File Upload Button */}
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload File
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>

        {/* Display Upload Progress */}
        {uploadProgress > 0 && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}

        {/* List of Resources */}
        <List sx={{ mt: 2 }}>
          {resources.map((resource) => (
            <ListItem key={resource._id}>
              <ListItemText
                primary={resource.title}
                secondary={resource.description}
              />
              <a
                href={`http://localhost:5000/${resource.filePath}`} // Link to download the file
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="contained" color="primary">
                  Download
                </Button>
              </a>
            </ListItem>
          ))}
        </List>

        {/* Save Resource Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSaveResource}
        >
          Save Resource
        </Button>
      </Box>
    </div>
  );
};

export default UploadResources;