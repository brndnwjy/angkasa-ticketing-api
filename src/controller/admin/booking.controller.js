const createError = require("http-errors");
const { success } = require("../../helper/response.helper");

const bookingModel = require("../../model/admin/booking.model");

const bookingController = {
  getBooking: async (req, res, next) => {
    try {
      const data = await bookingModel.getBooking();
      console.log(data.rows);

      success(res, data.rows, "success", "get all booking success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getBookingDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);

      const data = await bookingModel.getBookingDetail(id);
      delete data.rows[0].password;

      success(res, data.rows[0], "success", "get booking detail success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateBooking: async (req, res, next) => {
    try {
      const { id } = req.params;
      const date = new Date();

      await bookingModel.updateBooking(id, date);
      const result = await bookingModel.getBookingDetail(id);

      success(res, result.rows[0], "success", "update booking success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  cancelBooking: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await bookingModel.getBookingDetail(id);
      await bookingModel.cancelBooking(id);

      success(res, data.rows[0], "success", "cancel booking success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = bookingController;
