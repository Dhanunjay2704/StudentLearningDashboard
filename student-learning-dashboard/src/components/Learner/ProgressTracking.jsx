import React from 'react';
import { Typography, LinearProgress, Paper, Grid, Box } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const ProgressTracking = () => {
  const progressData = [
    { id: 1, title: 'Introduction to React', progress: 75 },
    { id: 2, title: 'Advanced JavaScript', progress: 45 },
  ];

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        <TrendingUp sx={{ verticalAlign: 'middle', mr: 1 }} />
        Your Progress
      </Typography>

      <Grid container spacing={3}>
        {progressData.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Paper
              sx={{
                p: 2,
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
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
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProgressTracking;