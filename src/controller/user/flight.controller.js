const { success, failed } = require("../../helper/response.helper");
const flightModel = require("../../model/user/flight.model");

const flightModelController = {
  listFlight: (req, res) => {
    flightModel
      .listFlight()
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  insertFlight: (req, res) => {
    const {
      arrival_country,
      arrival_city,
      departure_country,
      departure_city,
      arrival_time,
      departure_time,
      price,
      terminal,
      gate,
      wifi,
      baggage,
      lunch,
    } = req.body;
    const data = {
      arrival_country,
      arrival_city,
      departure_country,
      departure_city,
      arrival_time,
      departure_time,
      price,
      terminal,
      gate,
      wifi,
      baggage,
      lunch,
    };

    flightModel
      .insertFlight(data)
      .then(() => {
        // console.log(Object.keys(data).length);
        if (Object.keys(data).length <= 12) {
          success(res, data, "flight data has been entered");
        } else {
          failed(res, null, "failed", "failed to add data");
        }
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },
  updateFlight: (req, res) => {
    const flight_id = req.params.id;
    console.log(flight_id);
    const {
      arrival_country,
      arrival_city,
      departure_country,
      departure_city,
      arrival_time,
      departure_time,
      price,
      terminal,
      gate,
      wifi,
      baggage,
      lunch,
    } = req.body;

    const data = {
      arrival_country,
      arrival_city,
      departure_country,
      departure_city,
      arrival_time,
      departure_time,
      price,
      terminal,
      gate,
      wifi,
      baggage,
      lunch,
      flight_id,
    };

    flightModel
      .updateFlight(data)
      .then(() => {
        if (Object.keys(data).length >= 1) {
          success(res, data, "success", "data has been update");
        } else {
          failed(res, "failed", "failed to update data");
        }
      })
      .catch((err) => {
        // res.json(err);
        failed(res, err.message, "failed", "internal server error");
      });
  },
  deleteFlight: (req, res) => {
    const flight_id = req.params.id;
    flightModel
      .deleteFlight(flight_id)
      .then(() => {
        success(res, "success", "data has been deleted");
      })
      .catch((err) => {
        res.json(err);
      });
  },

  flightWithFilter: (req, res) => {
    // const search = req.query.search || "";
    // const sortBy = req.query.sortby || "flight_id";
    // const sortOrder = req.query.order || "asc";
    // console.log(search +" "+sortBy)
    // flightModel
    //     .flightWithFilter(search, sortBy, sortOrder)
    //     .then((results) => {
    //         // success(res, data, "success", "data has been update");
    //         res.json(results);
    //    }).catch((err) => {
    //         res.json(err)
    //    })

    // const search = 'depok';
    // const sortBy = 'flight_id';
    const search = req.query.search || "";
    const sortBy = req.query.sortby || "arrival_country";
    flightModel
      .flightWithFilter(search, sortBy)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        // res.json(err);
        failed(res, err.message, "failed", "internal server error");
      });
  },
};

module.exports = flightModelController;
