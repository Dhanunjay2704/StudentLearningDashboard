import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Pagination,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New student submission for Assignment 1', timestamp: '2 hours ago', read: false, type: 'submission' },
    { id: 2, message: 'Course "Introduction to React" has been updated', timestamp: '1 day ago', read: false, type: 'update' },
    { id: 3, message: 'Assignment submissions ready for review', timestamp: '3 days ago', read: true, type: 'submission' },
    { id: 4, message: 'New student submission for Assignment 2', timestamp: '4 days ago', read: false, type: 'submission' },
    { id: 5, message: 'Course "Advanced JavaScript" has been updated', timestamp: '5 days ago', read: false, type: 'update' },
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'submission', 'update'
  const [page, setPage] = useState(1);
  const notificationsPerPage = 3;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'submission') return notif.type === 'submission';
    if (filter === 'update') return notif.type === 'update';
    return true; // 'all'
  });

  const paginatedNotifications = filteredNotifications.slice(
    (page - 1) * notificationsPerPage,
    page * notificationsPerPage
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter">
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="unread">Unread</MenuItem>
          <MenuItem value="submission">Submissions</MenuItem>
          <MenuItem value="update">Updates</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleMarkAllAsRead}>
        Mark All as Read
      </Button>
      <Paper>
        <List>
          {paginatedNotifications.map((notification) => (
            <ListItem
              key={notification.id}
              secondaryAction={
                <>
                  {!notification.read && (
                    <IconButton edge="end" aria-label="mark as read" onClick={() => handleMarkAsRead(notification.id)}>
                      <CheckCircleIcon />
                    </IconButton>
                  )}
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNotification(notification.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                  sx={{
                    backgroundColor: notification.read ? '#f5f5f5' : '#fff',
                    textDecoration: notification.read ? 'line-through' : 'none',
                  }}
                >
                  <ListItemText primary={notification.message} secondary={notification.timestamp} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Pagination
            count={Math.ceil(filteredNotifications.length / notificationsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
          />
        </div>
      );
    };

    export default Notifications;