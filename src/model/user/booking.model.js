const pool = require("../../config/db");

const bookingModel = {
  createBooking: (data) => {
    console.log("berhasil masuk model")
    console.log(data.total);
    return pool.query(
      `
        INSERT INTO bookings (booking_id, user_id, flight_id, passenger_name, passenger_title, passenger_nationality, travel_insurance, total_payment) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `,
      [
        data.booking_id,
        data.user_id,
        data.flight_id,
        data.passenger_name,
        data.passenger_title,
        data.passenger_nationality,
        data.travel_insurance,
        data.total,
      ]
    );
  },

  getAllBooking: () => {
    return pool.query("SELECT * FROM bookings");
  },

  getBookingDetail: (id) => {
    return pool.query(`SELECT * FROM bookings WHERE booking_id = '${id}'`);
  },

  updateBooking: (id) => {
    return pool.query(
      `UPDATE bookings SET payment_status = true WHERE booking_id = '${id}'`
    );
  },

  cancelBooking: (id) => {
    return pool.query(`DELETE FROM bookings WHERE booking_id = '${id}'`);
  },
};

module.exports = bookingModel;
