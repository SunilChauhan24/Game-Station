import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_baseUrl;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const adminApis = {
  // Admin Login & Logout
  login: (email, password) => axiosInstance.post('/admin/login', {email, password}),
  addAdmin: (adminId, userName, email, password, isSuperUser) => axiosInstance.post(`/admin/${adminId}/addAdmin`, {userName, email, password, isSuperUser}),
  allAdmins: () => axiosInstance.get('/admin/admins'),
  deleteAdmin: (adminId, id) => axiosInstance.delete(`/admin/${adminId}/delete/${id}`),
  changePassword: (adminId, newPassword) => axiosInstance.post(`/admin/${adminId}/changePassword`, {newPassword}),
  adminDetails: (adminId) => axiosInstance.get(`/admin/${adminId}/details`),
  sendEmail: (adminId, to, subject, content) => axiosInstance.post(`/admin/${adminId}/sendEmail`, {to, subject, content}),
  fetchRecentActivity : (adminId) => axiosInstance.get(`/admin/${adminId}/activities`),

  // Users
  fetchUsers: () => axiosInstance.get('/admin/users'),
  addUser: (userData) => axiosInstance.post('/admin/users/add', userData),
  updateUser: (adminId, editedUserId, userData) => axiosInstance.put(`/admin/users/${adminId}/update/${editedUserId}`, userData),
  deleteUser: (adminId, id) => axiosInstance.delete(`/admin/users/${adminId}/delete/${id}`),
  
  // Quotes
  fetchQuotes: () => axiosInstance.get('/admin/quotes'),
  addQuote: (adminId, newQuote) => axiosInstance.post(`/admin/quotes/${adminId}/add`, newQuote),
  deleteQuote: (adminId, id) => axiosInstance.delete(`/admin/quotes/${adminId}/delete/${id}`),
  updateQuote: (adminId, selectedQuoteId, newQuote) => axiosInstance.put(`/admin/quotes/${adminId}/update/${selectedQuoteId}`, newQuote),

  // Games
  fetchGames: () => axiosInstance.get('/admin/games'),
  addGame: (adminId, formdata) => axiosInstance.post(`/admin/games/${adminId}/add`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }),
  updateGames: (adminId, id, updateData) => axiosInstance.put(`/admin/games/${adminId}/update/${id}`, updateData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }),
  deleteGame: (adminId, id) => axiosInstance.delete(`/admin/games/${adminId}/delete/${id}`),

  // Hosts
  fetchHosts: () => axiosInstance.get(`/admin/hosts`),
  deleteHost: (adminId, id) => axiosInstance.delete(`/admin/hosts/${adminId}/delete/${id}`),
  
  // GameStations
  fetchGameStations: () => axiosInstance.get('/admin/gameStations'),
  addGameStations: (adminId, formData) => axiosInstance.post(`/admin/gameStations/${adminId}/add`, formData),
  updateStatus: (adminId, id, status) => axiosInstance.put(`/admin/gameStations/${adminId}/update/${id}`, status),
  updateGameStation: (adminId, stationData) => axiosInstance.put(`/admin/gameStations/${adminId}/update/${stationData._id}`, stationData),
  deleteGameStation: (adminId, id) => axiosInstance.delete(`/admin/gameStations/${adminId}/delete/${id}`),
  getCountOfStationsById: (hostId) => axiosInstance.get(`/admin/gameStations/${hostId}/stations`),
  getAllGsByHostId: (hostId) => axiosInstance.get(`/admin/gameStations/getallstationbyhostId/${hostId}`),
  getGameStationData: (id) => axiosInstance.get(`/admin/gameStations/${id}`),
  
  // Bookings
  fetchBookings: () => axiosInstance.get('/bookings/allBookings'),

  // Feedback
  getAllFeedback: () => axiosInstance.get(`/feedback/get`),

  // Blogs
  getAllBlogs: () => axiosInstance.get(`/admin/blogs`),
  createBlog: (adminId, blogsData) => axiosInstance.post(`/admin/blogs/${adminId}/add`, blogsData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }),
  updateBlog: (adminId, blogId, blogsData) => axiosInstance.put(`/admin/blogs/${adminId}/update/${blogId}`, blogsData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }),
  deleteBlog: (adminId, blogId) => axiosInstance.delete(`/admin/blogs/${adminId}/delete/${blogId}`),

  // payments
  allPayments: () => axiosInstance.get(`/payment/all`),
};

export default adminApis;
