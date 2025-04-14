import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useMediaQuery, useTheme, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Instructor Dashboard
        </Typography>
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                Home
              </MenuItem>
              {isLoggedIn && (
                <>
                  <MenuItem component={Link} to="/instructor/dashboard" onClick={handleMenuClose}>
                    Dashboard
                  </MenuItem>
                  <MenuItem component={Link} to="/instructor/course-creation" onClick={handleMenuClose}>
                    Create Course
                  </MenuItem>
                  <MenuItem component={Link} to="/instructor/upload-resources" onClick={handleMenuClose}>
                    Upload Resources
                  </MenuItem>
                  <MenuItem component={Link} to="/instructor/student-progress" onClick={handleMenuClose}>
                    Student Progress
                  </MenuItem>
                  <MenuItem component={Link} to="/instructor/feedback-grading" onClick={handleMenuClose}>
                    Feedback & Grading
                  </MenuItem>
                  <MenuItem component={Link} to="/instructor/course-management" onClick={handleMenuClose}>
                    Course Management
                  </MenuItem>
                  <MenuItem component={Link} to="/instructor/notifications" onClick={handleMenuClose}>
                    Notifications
                  </MenuItem>
                  <MenuItem component={Link} to="/instructor/profile-settings" onClick={handleMenuClose}>
                    Profile & Settings
                  </MenuItem>
                </>
              )}
              
              {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                  Login
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {isLoggedIn ? (
              <>
                <Button color="inherit" component={Link} to="/instructor/dashboard">
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/instructor/course-creation">
                  Create Course
                </Button>
                <Button color="inherit" component={Link} to="/instructor/upload-resources">
                  Upload Resources
                </Button>
                <Button color="inherit" component={Link} to="/instructor/student-progress">
                  Student Progress
                </Button>
                <Button color="inherit" component={Link} to="/instructor/feedback-grading">
                  Feedback & Grading
                </Button>
                <Button color="inherit" component={Link} to="/instructor/course-management">
                  Course Management
                </Button>
                <Button color="inherit" component={Link} to="/instructor/notifications">
                  Notifications
                </Button>
                <Button color="inherit" component={Link} to="/instructor/profile-settings">
                  Profile & Settings
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;