import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentProgress = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', progress: 80, quizScore: 85, views: 120, readingTime: '2h 30m', feedback: '', selected: false },
    { id: 2, name: 'Jane Smith', progress: 60, quizScore: 70, views: 90, readingTime: '1h 45m', feedback: '', selected: false },
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [bulkFeedback, setBulkFeedback] = useState('');

  const handleFeedbackChange = (id, feedback) => {
    setStudents(students.map((student) => (student.id === id ? { ...student, feedback } : student)));
  };

  const handleSaveFeedback = () => {
    console.log('Feedback saved:', students);
  };

  const handleSelectStudent = (id) => {
    setStudents(students.map((student) => (student.id === id ? { ...student, selected: !student.selected } : student)));
  };

  const handleBulkEditFeedback = () => {
    const updatedStudents = students.map((student) =>
      student.selected ? { ...student, feedback: bulkFeedback } : student
    );
    setStudents(updatedStudents);
    setBulkFeedback('');
  };

  const filteredStudents = students.filter((student) => {
    if (filter === 'high') return student.progress >= 80;
    if (filter === 'medium') return student.progress >= 50 && student.progress < 80;
    if (filter === 'low') return student.progress < 50;
    return true; // 'all'
  });

  const chartData = {
    labels: filteredStudents.map((student) => student.name),
    datasets: [
      {
        label: 'Progress (%)',
        data: filteredStudents.map((student) => student.progress),
        backgroundColor: filteredStudents.map((student) =>
          student.progress >= 80 ? 'rgba(75, 192, 192, 0.6)' : student.progress >= 50 ? 'rgba(255, 206, 86, 0.6)' : 'rgba(255, 99, 132, 0.6)'
        ),
      },
    ],
  };

  const exportToCSV = () => {
    return filteredStudents.map((student) => ({
      Name: student.name,
      Progress: student.progress,
      'Quiz Score': student.quizScore,
      Views: student.views,
      'Reading Time': student.readingTime,
      Feedback: student.feedback,
    }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Student Progress Report', 10, 10);
    autoTable(doc, {
      head: [['Name', 'Progress (%)', 'Quiz Score', 'Views', 'Reading Time', 'Feedback']],
      body: filteredStudents.map((student) => [
        student.name,
        student.progress,
        student.quizScore,
        student.views,
        student.readingTime,
        student.feedback,
      ]),
    });
    doc.save('student_progress.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Student Progress Analytics
      </Typography>
      <Grid container spacing={3}>
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Progress by Student</Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Filter by Progress</InputLabel>
                <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter by Progress">
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="high">High (≥ 80%)</MenuItem>
                  <MenuItem value="medium">Medium (50% - 79%)</MenuItem>
                  <MenuItem value="low">Low ({'<'} 50%)</MenuItem>

                </Select>
              </FormControl>
              <Bar data={chartData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Student Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Student Details</Typography>
              <TextField
                fullWidth
                label="Bulk Edit Feedback"
                value={bulkFeedback}
                onChange={(e) => setBulkFeedback(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleBulkEditFeedback}>
                Apply to Selected
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={
                            students.some((student) => student.selected) && !students.every((student) => student.selected)
                          }
                          checked={students.every((student) => student.selected)}
                          onChange={() =>
                            setStudents(students.map((student) => ({ ...student, selected: !students.every((student) => student.selected) })))
                          }
                        />
                      </TableCell>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Progress (%)</TableCell>
                      <TableCell>Quiz Score</TableCell>
                      <TableCell>Views</TableCell>
                      <TableCell>Reading Time</TableCell>
                      <TableCell>Feedback</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={student.selected}
                            onChange={() => handleSelectStudent(student.id)}
                          />
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.progress}</TableCell>
                        <TableCell>{student.quizScore}</TableCell>
                        <TableCell>{student.views}</TableCell>
                        <TableCell>{student.readingTime}</TableCell>
                        <TableCell>
                          <TextField
                            value={student.feedback}
                            onChange={(e) => handleFeedbackChange(student.id, e.target.value)}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Buttons for Export & Save */}
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSaveFeedback}>
                Save Feedback
              </Button>
              <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
                <CSVLink data={exportToCSV()} filename="student_progress.csv" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Export to CSV
                </CSVLink>
              </Button>
              <Button variant="contained" color="success" sx={{ mt: 2, ml: 2 }} onClick={exportToPDF}>
                Export to PDF
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentProgress;