const express = require("express");
const {
  getAllBooking,
  getBookingDetail,
  createBooking,
  updateBooking,
  cancelBooking,
} = require("../controller/user/booking.controller");
const router = express.Router();

router
  .get("/", getAllBooking)
  .get("/:id", getBookingDetail)
  .post("/", createBooking)
  .put("/:id", updateBooking)
  .delete("/:id", cancelBooking);

module.exports = router;
