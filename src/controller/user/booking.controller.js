const createError = require("http-errors");
const { v4: uuid } = require("uuid");

const bookingModel = require("../../model/user/booking.model");

const bookingController = {
  createBooking: async (req, res, next) => {
    try {
      const id = uuid();
      const date = new Date();
      const {
        user_id,
        flight_id,
        cp_name,
        cp_phone,
        cp_email,
        passenger_title,
        passenger_name,
        passenger_nationality,
        travel_insurance,
        total,
      } = req.body;

      const bookingData = {
        booking_id: id,
        user_id,
        flight_id,
        cp_name,
        cp_phone,
        cp_email,
        passenger_title,
        passenger_name,
        passenger_nationality,
        travel_insurance,
        total,
        created_at: date,
      };

      console.log(bookingData);

      await bookingModel.createBooking(bookingData);

      return res.json({
        msg: "ticket booked",
        data: bookingData,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getAllBooking: async (req, res, next) => {
    try {
      const data = await bookingModel.getAllBooking();
      console.log(data.rows);

      res.json({
        msg: "get all bookings",
        data: data.rows[0],
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  //   getMyBooking: async (req, res, next) => {
  //     try {
  //       const data = await bookingModel.getMyBooking();
  //       console.log(data);

  //       res.json({
  //         msg: "get my bookings",
  //         data: data,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       next(new createError.InternalServerError());
  //     }
  //   },

  getBookingDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);

      const data = await bookingModel.getBookingDetail(id);

      res.json({
        msg: `get booking detail with id : ${id}`,
        data: data.rows[0],
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateBooking: async (req, res, next) => {
    try {
      const { id } = req.params;

      await bookingModel.updateBooking(id);

      res.json({
        msg: `booking payment updated with id : ${id}`,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  cancelBooking: async (req, res, next) => {
    try {
      const { id } = req.params;

      await bookingModel.cancelBooking(id);

      res.json({
        msg: `booking with id ${id} have been cancelled`,
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = bookingController;
