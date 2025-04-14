import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// Register a new user
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Signup failed');
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

// Set the authorization token in headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Create a new course
export const createCourse = async (courseData) => {
    try {
      const response = await axios.post(`${API_URL}/courses`, courseData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create course');
    }
  };


  // Fetch all courses for the logged-in instructor
export const getCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch courses');
    }
  };
  
  // Update a course
  export const updateCourse = async (courseId, courseData) => {
    try {
      const response = await axios.put(`${API_URL}/courses/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update course');
    }
  };
  
  // Delete a course
  export const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`${API_URL}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete course');
    }
  };


  // Upload a new resource
export const uploadResource = async (resourceData) => {
  try {
    const formData = new FormData();
    formData.append('title', resourceData.title);
    formData.append('description', resourceData.description);
    formData.append('course', resourceData.course);
    formData.append('file', resourceData.file);

    const response = await axios.post(`${API_URL}/resources`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to upload resource');
  }
};

// Get all resources for a course
export const getResources = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/resources/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch resources');
  }
};

// Fetch dashboard data
export const getDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch dashboard data');
  }
};


// Get detailed course information
// export const getCourseDetails = async (courseId) => {
//   try {
//     const response = await axios.get(`${API_URL}/courses/${courseId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.error || 'Failed to fetch course details');
//   }
// };


// export const getCourseDetails = async (courseId) => {
//   try {
//     const response = await axios.get(`${API_URL}/courses/${courseId}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', {
//       status: error.response?.status,
//       data: error.response?.data
//     });
//     throw new Error(error.response?.data?.error || 'Course load failed');
//   }
// };


export const getCourseDetails = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/courses/details/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch course details');
  }
};