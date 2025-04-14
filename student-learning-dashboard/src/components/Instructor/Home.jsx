import React from 'react';
import { Typography, Button, Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to the Learning Platform
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Choose your role to get started:
      </Typography>

      {/* Instructor and Learner Options */}
      <Grid container spacing={4} justifyContent="center">
        {/* Instructor Section */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 4,
              border: '1px solid #ccc',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Instructor
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Manage courses, track student progress, and provide feedback.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/instructor/login')} // Redirect to Instructor Login
              >
                Instructor Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/instructor/signup')} // Redirect to Instructor Sign Up
              >
                Instructor Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Learner Section */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 4,
              border: '1px solid #ccc',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Learner
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Access courses, track your progress, and submit feedback.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/learner/login')} // Redirect to Learner Login
              >
                Learner Login
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/learner/signup')} // Redirect to Learner Sign Up
              >
                Learner Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;