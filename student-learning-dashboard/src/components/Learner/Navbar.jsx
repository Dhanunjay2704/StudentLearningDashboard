import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Dashboard, Timeline, Feedback as FeedbackIcon } from '@mui/icons-material';

const LearnerNavbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Learner Dashboard
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/learner/dashboard"
          sx={{ fontWeight: 'bold', mr: 2 }}
          startIcon={<Dashboard />}
        >
          Dashboard
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/learner/progress"
          sx={{ fontWeight: 'bold', mr: 2 }}
          startIcon={<Timeline />}
        >
          Progress
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/learner/feedback"
          sx={{ fontWeight: 'bold' }}
          startIcon={<FeedbackIcon />}
        >
          Feedback
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default LearnerNavbar;