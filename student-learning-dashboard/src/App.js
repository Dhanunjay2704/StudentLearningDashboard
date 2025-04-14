import React, { useState, useEffect } from 'react'; // Add useEffect here
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Instructor/Home';
import Login from './components/Instructor/Login';
import SignUp from './components/Instructor/SignUp';
import InstructorDashboard from './components/Instructor/Dashboard';
import CourseCreation from './components/Instructor/CourseCreation';
import UploadResources from './components/Instructor/UploadResources';
import StudentProgress from './components/Instructor/StudentProgress';
import FeedbackGrading from './components/Instructor/FeedbackGrading';
import CourseManagement from './components/Instructor/CourseManagement';
import Notifications from './components/Instructor/Notifications';
import ProfileSettings from './components/Instructor/ProfileSettings';
import CourseDetails from './components/Instructor/CourseDetails';
import Navbar from './components/Instructor/Navbar';
import NotFound from './components/Instructor/NotFound'; 


function App() {
  // Initialize isLoggedIn based on the presence of a token in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Update isLoggedIn whenever the token changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ element }) => {
    console.log('ProtectedRoute - isLoggedIn:', isLoggedIn); // Debug log
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/instructor/dashboard"
          element={<ProtectedRoute element={<InstructorDashboard />} />}
        />
        <Route
          path="/instructor/course-creation"
          element={<ProtectedRoute element={<CourseCreation />} />}
        />
        <Route
          path="/instructor/upload-resources"
          element={<ProtectedRoute element={<UploadResources />} />}
        />
        <Route
          path="/instructor/student-progress"
          element={<ProtectedRoute element={<StudentProgress />} />}
        />
        <Route
          path="/instructor/feedback-grading"
          element={<ProtectedRoute element={<FeedbackGrading />} />}
        />
        <Route
          path="/instructor/course-management"
          element={<ProtectedRoute element={<CourseManagement />} />}
        />

<Route path="/instructor/course-details/:courseId" element={<CourseDetails />} />
        <Route
          path="/instructor/notifications"
          element={<ProtectedRoute element={<Notifications />} />}
        />
        <Route
          path="/instructor/profile-settings"
          element={<ProtectedRoute element={<ProfileSettings />} />}
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // Instructor Components
// import Home from './components/Instructor/Home';
// import InstructorLogin from './components/Instructor/Login';
// import InstructorSignUp from './components/Instructor/SignUp';
// import InstructorDashboard from './components/Instructor/Dashboard';
// import CourseCreation from './components/Instructor/CourseCreation';
// import UploadResources from './components/Instructor/UploadResources';
// import StudentProgress from './components/Instructor/StudentProgress';
// import FeedbackGrading from './components/Instructor/FeedbackGrading';
// import CourseManagement from './components/Instructor/CourseManagement';
// import Notifications from './components/Instructor/Notifications';
// import ProfileSettings from './components/Instructor/ProfileSettings';
// import InstructorNavbar from './components/Instructor/Navbar';
// import NotFound from './components/Instructor/NotFound'; // 404 Page

// // Learner Components
// import LearnerLogin from './components/Learner/Login';
// import LearnerSignUp from './components/Learner/SignUp';
// import LearnerDashboard from './components/Learner/Dashboard';
// import CourseDetails from './components/Learner/CourseDetails';
// import ProgressTracking from './components/Learner/ProgressTracking';
// import Feedback from './components/Learner/Feedback';
// import LearnerNavbar from './components/Learner/Navbar';
 

// function App() {
//   // Initialize isLoggedIn based on the presence of a token in localStorage
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

//   // Update isLoggedIn whenever the token changes
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   // Protected Route Component
//   const ProtectedRoute = ({ element }) => {
//     console.log('ProtectedRoute - isLoggedIn:', isLoggedIn); // Debug log
//     return isLoggedIn ? element : <Navigate to="/" />;
//   };

//   // Render the correct navbar based on the route
//   const renderNavbar = () => {
//     const path = window.location.pathname;
//     console.log('Current path:', path); // Debug log

//     if (path.startsWith('/learner')) {
//       console.log('Displaying Learner Navbar'); // Debug log
//       return <LearnerNavbar />;
//     } else if (path.startsWith('/instructor')) {
//       console.log('Displaying Instructor Navbar'); // Debug log
//       return <InstructorNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
//     } else {
//       console.log('No navbar for public routes'); // Debug log
//       return null; // No navbar for public routes (e.g., home, login, signup)
//     }
//   };

//   return (
//     <Router>
//       {/* Render the correct navbar based on the route */}
//       {renderNavbar()}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/instructor/login" element={<InstructorLogin setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/instructor/signup" element={<InstructorSignUp />} />
//         <Route path="/learner/login" element={<LearnerLogin setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/learner/signup" element={<LearnerSignUp />} />

//         {/* Instructor Routes */}
//         <Route
//           path="/instructor/dashboard"
//           element={<ProtectedRoute element={<InstructorDashboard />} />}
//         />
//         <Route
//           path="/instructor/course-creation"
//           element={<ProtectedRoute element={<CourseCreation />} />}
//         />
//         <Route
//           path="/instructor/upload-resources"
//           element={<ProtectedRoute element={<UploadResources />} />}
//         />
//         <Route
//           path="/instructor/student-progress"
//           element={<ProtectedRoute element={<StudentProgress />} />}
//         />
//         <Route
//           path="/instructor/feedback-grading"
//           element={<ProtectedRoute element={<FeedbackGrading />} />}
//         />
//         <Route
//           path="/instructor/course-management"
//           element={<ProtectedRoute element={<CourseManagement />} />}
//         />
//         <Route
//           path="/instructor/notifications"
//           element={<ProtectedRoute element={<Notifications />} />}
//         />
//         <Route
//           path="/instructor/profile-settings"
//           element={<ProtectedRoute element={<ProfileSettings />} />}
//         />

//         {/* Learner Routes
//         <Route
//           path="/learner/dashboard"
//           element={<ProtectedRoute element={<LearnerDashboard />} />}
//         />
//         <Route
//           path="/learner/course/:courseId"
//           element={<ProtectedRoute element={<CourseDetails />} />}
//         />
//         <Route
//           path="/learner/progress"
//           element={<ProtectedRoute element={<ProgressTracking />} />}
//         />
//         <Route
//           path="/learner/feedback"
//           element={<ProtectedRoute element={<Feedback />} />}
//         /> */}

//         {/* 404 Page */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;