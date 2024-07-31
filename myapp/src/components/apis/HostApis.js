import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_baseUrl;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const hostApis = {
    login: (emailOrPhone, password) => axiosInstance.post('/hosts/login', {emailOrPhone, password}),
    register: ( email, phone, password) => axiosInstance.post('/hosts/register', { email, phone, password}),
    forgotPassword: (email) => axiosInstance.post('/hosts/forgot-password', {email}),
    fetchOtp: (email, OTP) => axiosInstance.post('/hosts/fetchOtp', {email, OTP}),
    resetPassword: ( email, otp, newPassword) => axiosInstance.post('/hosts/reset-password', {email, otp, newPassword}),
    getStationsByHostId: (hostId) => axiosInstance.get(`/gameStation/getallstationbyhostId/${hostId}`),
    getCities:() => axiosInstance.get(`/admin/getCities`),
    getStates:() => axiosInstance.get(`/admin/getStates`),
    getCountries:() => axiosInstance.get(`/admin/getCountry`),
    addGameStation: (formdata) => axiosInstance.post(`/gameStation/addGameStation`, formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    updateGameStation: (stationId,formdata) => axiosInstance.put(`/gameStation/updateGameStation/${stationId}`, formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    deleteGameStation: (stationId) => axiosInstance.delete(`/gameStation/gameStation/${stationId}`),
    getGameStationData: (id) => axiosInstance.get(`/gameStation/${id}`),
    getAllGamesOfGs: (stationId) => axiosInstance.get(`/gameStation/${stationId}/games`),
    getAllGames: () => axiosInstance.get('/games/all'),
    addGameInGs: (stationId, gameId, description, slotPrice, time) => axiosInstance.post(`/gameStation/addGame/${stationId}`, {gameId, description, slotPrice, time}),
    updateGameInGs: (stationId, gameId, description, slotPrice, time) => axiosInstance.put(`/gameStation/${stationId}/updateGame/${gameId}`, { description, slotPrice, time}),
    deleteGameInGs: (stationId, gameId) => axiosInstance.delete(`/gameStation/${stationId}/deleteGame/${gameId}`),
    getAllBookingsOfGs: (stationId) => axiosInstance.get(`/gameStation/${stationId}/bookings`),
    setTiming: ( stationId, openingTime, closingTime, closedDays) => axiosInstance.put(`/gameStation/timing/${stationId}`, {openingTime, closingTime, closedDays}),
    addImage: (stationId, formdata) => axiosInstance.post(`/gameStation/${stationId}/Media`, formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    addVideo: (stationId, formdata) => axiosInstance.post(`/gameStation/${stationId}/Video`, formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    getAllSlotsbyGsId: (stationId) => axiosInstance.get(`/gameStation/${stationId}/slots`),
    getAllSlotsbyGsIdandDate: (stationId,date) => axiosInstance.get(`/gameStation/${stationId}/slots/${date}`),
    addSlots: (stationId, slots) => axiosInstance.post(`/slots/${stationId}/addSlots`, slots),
    updateSlotTime: (slotId, slotsData) => axiosInstance.put(`/slots/${slotId}/updateSlot`, slotsData),
    deleteSlot: (slotId) => axiosInstance.delete(`/slots/${slotId}/deleteSlot`),

    allPayments: (stationId) => axiosInstance.get(`/payment/${stationId}`),

    bankDetails: (stationId, bankDetails) => axiosInstance.post(`/bankDetails/${stationId}/bankDetails`, bankDetails),
    getBankDetails: (stationId) => axiosInstance.get(`/bankDetails/${stationId}/bankDetails`),
};

export default hostApis;
