import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api'; // Use the same login function (update backend to handle learner login)

const LearnerLogin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await login({ email, password, role: 'learner' }); // Add role for backend to differentiate
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token); // Store the token in localStorage
      setIsLoggedIn(true); // Update the isLoggedIn state
      navigate('/learner/dashboard'); // Redirect to the learner dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Learner Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
      <Typography sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Button color="primary" onClick={() => navigate('/learner/signup')}>
          Sign Up
        </Button>
      </Typography>
    </Box>
  );
};

export default LearnerLogin;