import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getDashboardData } from '../../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [studentProgress, setStudentProgress] = useState([]);

  // Use the useNavigate hook for redirection
  const navigate = useNavigate();

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setCourses(data.courses);
        setNotifications(data.notifications);
        setStudentProgress(data.studentProgress);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };
    fetchDashboardData();
  }, []);

  // Chart data for student progress
  const chartData = {
    labels: courses.map((course) => course.title),
    datasets: [
      {
        label: 'Student Progress (%)',
        data: courses.map((course) => course.progress || 0),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Dashboard Header */}
      <Typography variant="h4" gutterBottom>
        Welcome back 
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/instructor/course-creation')} // Redirect to Course Creation
          >
            Create New Course
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/instructor/upload-resources')} // Redirect to Upload Resources
          >
            Upload Resources
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate('/instructor/student-progress')} // Redirect to Student Progress
          >
            View Analytics
          </Button>
        </Grid>
      </Grid>

      {/* Course Overview */}
      <Typography variant="h5" gutterBottom>
        Your Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card
              sx={{
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {course.students} Students
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {course.progress}% Completed
                </Typography>
                
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                  onClick={() => navigate(`/instructor/course-details/${course._id}`)}
                >
                  View Details
                </Button>
                
                <Button
                  variant="outlined"
                  sx={{ mt: 1, ml: 1 }}
                  onClick={() => navigate(`/instructor/course-management`)} 
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Student Progress Chart */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Student Progress
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Student Progress by Course' },
            },
          }}
        />
      </Paper>

      {/* Notifications */}
      <Typography variant="h5" gutterBottom>
        Recent Notifications
      </Typography>
      <Paper>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification._id}>
              <ListItemText
                primary={notification.message}
                secondary={new Date(notification.createdAt).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default Dashboard;