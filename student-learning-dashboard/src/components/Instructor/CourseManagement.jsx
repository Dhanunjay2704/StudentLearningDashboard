import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { getCourses, updateCourse, deleteCourse } from '../../services/api';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleEditCourse = (course) => {
    setEditCourse(course);
  };

  // Handle saving an edited course
  const handleSaveCourse = async () => {
    try {
      console.log('Updating course:', editCourse); // Debug log
      const updatedCourse = await updateCourse(editCourse._id, editCourse);
      console.log('Update response:', updatedCourse); // Debug log
      setCourses(courses.map((course) => (course._id === updatedCourse._id ? updatedCourse : course)));
      setEditCourse(null);
    } catch (err) {
      console.error('Failed to update course:', err);
    }
  };

  // Handle deleting a course
  const handleDeleteCourse = async (courseId) => {
    try {
      console.log('Deleting course with ID:', courseId); // Debug log
      await deleteCourse(courseId);
      console.log('Course deleted successfully'); // Debug log
      setCourses(courses.filter((course) => course._id !== courseId));
      setDeleteCourseId(null);
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  const handleAddCourse = () => {
    setCourses([...courses, { id: courses.length + 1, ...newCourse }]);
    setNewCourse({ title: '', description: '' });
    setOpenAddDialog(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Course Management
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search courses..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Paper>
        <List>
          {filteredCourses.map((course) => (
            <ListItem
              key={course._id} // Use course._id instead of course.id
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditCourse(course)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => setDeleteCourseId(course._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={course.title} secondary={course.description} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Add New Course Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Course Title"
            variant="outlined"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCourse} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Course Dialog */}
      {editCourse && (
        <Dialog open={Boolean(editCourse)} onClose={() => setEditCourse(null)}>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Course Title"
              variant="outlined"
              value={editCourse.title}
              onChange={(e) => setEditCourse({ ...editCourse, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={editCourse.description}
              onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditCourse(null)}>Cancel</Button>
            <Button onClick={handleSaveCourse} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Course Confirmation Dialog */}
      {deleteCourseId && (
        <Dialog open={Boolean(deleteCourseId)} onClose={() => setDeleteCourseId(null)}>
          <DialogTitle>Delete Course</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this course?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteCourseId(null)}>Cancel</Button>
            <Button onClick={() => handleDeleteCourse(deleteCourseId)} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CourseManagement;