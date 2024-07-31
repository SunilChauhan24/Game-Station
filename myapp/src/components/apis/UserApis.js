import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_baseUrl;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const userApis = {
    login: (emailOrPhone, password) => axiosInstance.post('/users/login', {emailOrPhone, password}),
    register: (userName, email, phone, password) => axiosInstance.post('/users/register', {userName, email, phone, password}),
    getQuotes: () => axiosInstance.get('/quotes/getQuotes'),
    forgotPassword: (email) => axiosInstance.post('/users/forgot-password', {email}),
    fetchOtp: (email, OTP) => axiosInstance.post('/users/fetchOtp', {email, OTP}),
    resetPassword: ( email, otp, newPassword) => axiosInstance.post('/users/reset-password', {email, otp, newPassword}),
    getUserDetails: (userId) => axiosInstance.get(`/users/details/${userId}`),
    updateUserDetails: (userId, details) => axiosInstance.put(`/users/update/${userId}`, details, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

    // user feedback
    submitFeedback: (formData) => axiosInstance.post('/feedback/submit', formData),

    // ContactUs
    contactUs: (name, email, subject, message) => axiosInstance.post(`/users/contactUs`, {name, email, subject, message}),

    // gameStations
    fetchGameStations: () => axiosInstance.get('/gameStation/allStations'),
    getGameStationData: (userId,id) => axiosInstance.get(`/users/${userId}/gameStation/${id}`),
    getAllGamesOfGs: (stationId) => axiosInstance.get(`/users/${stationId}/games`),
    getAllGames: () => axiosInstance.get('/games/all'),
    getGamedata: (stationId, gameId) => axiosInstance.get(`/gameStation/${stationId}/${gameId}/game`),
    fetchSlots: (stationId, gameId, date) => axiosInstance.get(`/gameStation/${stationId}/${gameId}/${date}/slots`),
    fetchSlotsbyBookingId: (bookingId) => axiosInstance.get(`/slots/${bookingId}`),
    
    // Blogs
    fetchBlogs: () => axiosInstance.get('/blogs/get'),

    // Bookings
    createRazorpayOrder: (amount) => axiosInstance.post(`/payment/createOrder`, amount),
    addBookings: (stationId, bookingData) => axiosInstance.post(`/bookings/${stationId}/addBooking`, bookingData),
    updateBookingIdinSlot: (slotId, slotData) => axiosInstance.put(`/slots/${slotId}/updateSlot`, slotData),
    getBookingsOfUser: (userId) => axiosInstance.get(`/users/${userId}/bookings`),
    cancelBooking: (bookingId) => axiosInstance.delete(`/bookings/${bookingId}/cancel`),
    savePayment: (paymentData) => axiosInstance.post(`/payment/paymentVerification`, paymentData),

    findSlotIdfromBookingId: (bookingId) => axiosInstance.get(`/slots/${bookingId}`),
    

};

export default userApis;
