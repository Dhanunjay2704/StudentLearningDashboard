import React, { useState } from 'react';
import { Typography, Grid, Card, CardContent, Button, LinearProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EmojiEvents, School } from '@mui/icons-material';

const LearnerDashboard = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Introduction to React', progress: 75 },
    { id: 2, title: 'Advanced JavaScript', progress: 45 },
  ]);

  const navigate = useNavigate();

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        <School sx={{ verticalAlign: 'middle', mr: 1 }} />
        Welcome, Learner!
      </Typography>

      {/* Course Overview */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3, color: '#333' }}>
        <EmojiEvents sx={{ verticalAlign: 'middle', mr: 1 }} />
        Your Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' },
                borderRadius: '10px',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={course.progress}
                  sx={{ mt: 1, height: '10px', borderRadius: '5px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, width: '100%', fontWeight: 'bold' }}
                  onClick={() => navigate(`/learner/course/${course.id}`)}
                >
                  View Course
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LearnerDashboard;