import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Button, LinearProgress, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    id: courseId,
    title: 'Introduction to React',
    modules: [
      {
        id: 1,
        title: 'Module 1: Basics',
        resources: [
          { id: 1, title: 'Resource 1: React Basics PDF', type: 'pdf', progress: 30 },
          { id: 2, title: 'Resource 2: React Basics Video', type: 'video', progress: 50 },
        ],
      },
      {
        id: 2,
        title: 'Module 2: Advanced',
        resources: [
          { id: 3, title: 'Resource 3: State Management PDF', type: 'pdf', progress: 10 },
          { id: 4, title: 'Resource 4: Hooks Tutorial Video', type: 'video', progress: 70 },
        ],
      },
    ],
  });

  const handleResourceClick = (resource) => {
    // Handle resource click (e.g., open PDF or video)
    console.log(`Opening resource: ${resource.title}`);
    // You can add logic to open PDFs or videos here
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {course.title}
      </Typography>

      {/* Modules and Resources */}
      <Paper sx={{ p: 2 }}>
        <List>
          {course.modules.map((module) => (
            <div key={module.id}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                {module.title}
              </Typography>
              {module.resources.map((resource) => (
                <ListItem key={resource.id} sx={{ mb: 1 }}>
                  <ListItemText
                    primary={resource.title}
                    secondary={`Type: ${resource.type.toUpperCase()}`}
                  />
                  <Box sx={{ width: '100%', mr: 2 }}>
                    <LinearProgress variant="determinate" value={resource.progress} />
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => handleResourceClick(resource)}
                  >
                    Open
                  </Button>
                </ListItem>
              ))}
            </div>
          ))}
        </List>
      </Paper>

      {/* Back to Dashboard Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate('/learner/dashboard')}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default CourseDetails;