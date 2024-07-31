const express = require("express");
const {
  addBooking,
  allBookings,
  cancelBooking,
} = require("../../controller/bookings/bookingsController");
const router = express.Router();

router.post("/:gameStationId/addBooking", addBooking);
router.get("/allBookings", allBookings); 
router.delete("/:bookingId/cancel", cancelBooking);

module.exports = router;
