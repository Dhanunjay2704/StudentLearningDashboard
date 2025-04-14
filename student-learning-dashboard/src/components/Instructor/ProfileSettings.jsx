import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Paper, Avatar, FormControlLabel, Checkbox, Snackbar, Alert } from '@mui/material';

const ProfileSettings = () => {
  const [name, setName] = useState('Professor Smith');
  const [email, setEmail] = useState('prof.smith@example.com');
  const [bio, setBio] = useState('Experienced instructor in web development and programming.');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSave = () => {
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    console.log('Profile updated:', {
      name,
      email,
      bio,
      newPassword,
      profilePicture,
      notificationPreferences,
    });
    setSnackbarMessage('Profile updated successfully.');
    setSnackbarOpen(true);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationPreferenceChange = (type) => (event) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [type]: event.target.checked,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Profile & Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={profilePicture}
              sx={{ width: 100, height: 100, mr: 2 }}
            />
            <Button variant="contained" component="label">
              Upload Profile Picture
              <input type="file" hidden accept="image/*" onChange={handleProfilePictureChange} />
            </Button>
          </Box>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && error.includes('email')}
            helperText={error.includes('email') ? error : ''}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!error && error.includes('Passwords')}
            helperText={error.includes('Passwords') ? error : ''}
            sx={{ mb: 2 }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Notification Preferences
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={notificationPreferences.email}
                onChange={handleNotificationPreferenceChange('email')}
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={notificationPreferences.push}
                onChange={handleNotificationPreferenceChange('push')}
              />
            }
            label="Push Notifications"
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProfileSettings;