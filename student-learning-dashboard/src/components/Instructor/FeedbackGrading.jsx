import React, { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Snackbar,
  Alert,
} from '@mui/material';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const FeedbackGrading = () => {
  const [submissions, setSubmissions] = useState([
    { id: 1, name: 'John Doe', submission: 'Assignment 1', grade: 'A', feedback: '', selected: false },
    { id: 2, name: 'Jane Smith', submission: 'Assignment 1', grade: 'B', feedback: '', selected: false },
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [bulkEditGrade, setBulkEditGrade] = useState('');
  const [bulkEditFeedback, setBulkEditFeedback] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleGradeChange = (id, grade) => {
    setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, grade } : sub)));
  };

  const handleFeedbackChange = (id, feedback) => {
    setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, feedback } : sub)));
  };

  const handleSave = () => {
    const newErrors = {};
    submissions.forEach((sub) => {
      if (!sub.grade.trim()) newErrors[`grade-${sub.id}`] = 'Grade is required';
      if (!sub.feedback.trim()) newErrors[`feedback-${sub.id}`] = 'Feedback is required';
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
    } else {
      setErrors({});
      console.log('Grades and feedback saved:', submissions);
      setSnackbarMessage('Grades and feedback saved successfully.');
      setSnackbarOpen(true);
    }
  };

  const handleSelectSubmission = (id) => {
    setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, selected: !sub.selected } : sub)));
  };

  const handleBulkEdit = () => {
    const updatedSubmissions = submissions.map((sub) =>
      sub.selected
        ? {
            ...sub,
            grade: bulkEditGrade || sub.grade,
            feedback: bulkEditFeedback || sub.feedback,
          }
        : sub
    );
    setSubmissions(updatedSubmissions);
    setBulkEditGrade('');
    setBulkEditFeedback('');
  };

  const exportToCSV = () => {
    const csvData = submissions.map((sub) => ({
      Name: sub.name,
      Submission: sub.submission,
      Grade: sub.grade,
      Feedback: sub.feedback,
    }));
    return csvData;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Grades and Feedback Report', 10, 10);
    doc.autoTable({
      head: [['Name', 'Submission', 'Grade', 'Feedback']],
      body: submissions.map((sub) => [sub.name, sub.submission, sub.grade, sub.feedback]),
    });
    doc.save('grades_feedback.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Feedback & Grading
      </Typography>

      {/* Bulk Edit Section */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Bulk Edit
        </Typography>
        <TextField
          label="Bulk Edit Grade"
          value={bulkEditGrade}
          onChange={(e) => setBulkEditGrade(e.target.value)}
          size="small"
          sx={{ mr: 2 }}
        />
        <TextField
          label="Bulk Edit Feedback"
          value={bulkEditFeedback}
          onChange={(e) => setBulkEditFeedback(e.target.value)}
          size="small"
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleBulkEdit}>
          Apply to Selected
        </Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    submissions.some((sub) => sub.selected) && !submissions.every((sub) => sub.selected)
                  }
                  checked={submissions.every((sub) => sub.selected)}
                  onChange={() =>
                    setSubmissions(submissions.map((sub) => ({ ...sub, selected: !submissions.every((sub) => sub.selected) })))
                  }
                />
              </TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Submission</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={row.selected}
                    onChange={() => handleSelectSubmission(row.id)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.submission}</TableCell>
                <TableCell>
                  <TextField
                    value={row.grade}
                    onChange={(e) => handleGradeChange(row.id, e.target.value)}
                    size="small"
                    error={!!errors[`grade-${row.id}`]}
                    helperText={errors[`grade-${row.id}`]}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.feedback}
                    onChange={(e) => handleFeedbackChange(row.id, e.target.value)}
                    size="small"
                    error={!!errors[`feedback-${row.id}`]}
                    helperText={errors[`feedback-${row.id}`]}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => setSelectedSubmission(row)}>
                    View Submission
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
        Save Grades
      </Button>
      <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
        <CSVLink data={exportToCSV()} filename="grades_feedback.csv" style={{ color: 'inherit', textDecoration: 'none' }}>
          Export to CSV
        </CSVLink>
      </Button>
      <Button variant="contained" color="success" sx={{ mt: 2, ml: 2 }} onClick={exportToPDF}>
        Export to PDF
      </Button>

      {/* View Submission Dialog */}
      {selectedSubmission && (
        <Dialog open={Boolean(selectedSubmission)} onClose={() => setSelectedSubmission(null)}>
          <DialogTitle>View Submission</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedSubmission.name}</Typography>
            <Typography variant="body1">Submission: {selectedSubmission.submission}</Typography>
            <Typography variant="body1">Grade: {selectedSubmission.grade}</Typography>
            <Typography variant="body1">Feedback: {selectedSubmission.feedback}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedSubmission(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={Object.keys(errors).length > 0 ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FeedbackGrading;