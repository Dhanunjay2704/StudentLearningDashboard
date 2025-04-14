import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Box } from '@mui/material';
import { Send } from '@mui/icons-material';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        <Send sx={{ verticalAlign: 'middle', mr: 1 }} />
        Submit Feedback
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          fullWidth
          label="Your Feedback"
          variant="outlined"
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ fontWeight: 'bold' }}
        >
          Submit Feedback
        </Button>
      </Paper>
    </Box>
  );
};

export default Feedback;