const { success, failed } = require("../../helper/response.helper");
const flightModel = require('../../model/user/flight.model');


const flightModelController = {
    listFlight: (req, res) => {
        flightModel
            .listFlight()
            .then((results) => {
                res.json(results);
            }).catch((err) => {
                res.json(err);
            });

    },
    insertFlight: (req, res) => {
        const { arrival_country, arrival_city,
            departure_country, departure_city,
            arrival_time, departure_time,
            price, terminal, gate,
            wifi, baggage, lunch } = req.body;
        const data = {
            arrival_country, arrival_city,
            departure_country, departure_city,
            arrival_time, departure_time, price,
            terminal, gate, wifi, baggage, lunch
        };

        flightModel
            .insertFlight(data)
            .then((results) => {
                // console.log(Object.keys(data).length);
                if (Object.keys(data).length <= 12) {
                    success(res, data, "flight data has been entered");
                } else {
                    failed(res, null, "failed", "failed to add data")
                }

            }).catch((err) => {
                failed(res, err.message, "failed", "internal server error");
            })
    },
    updateFlight: (req, res) => {
        const flight_id = req.params.id;
        console.log(flight_id)
        const {
            arrival_country, arrival_city, 
            departure_country, departure_city,
            arrival_time, departure_time, price,
            terminal, gate, wifi, baggage, lunch
        } = req.body;

        const data = {
            arrival_country, arrival_city, 
            departure_country, departure_city,
            arrival_time, departure_time, price,
            terminal, gate, wifi, baggage, lunch, flight_id
        }

        flightModel
            .updateFlight(data)
            .then((results) => {
                if (Object.keys(data).length >= 1) {
                    success(res, data, "success", "data has been update"); 
                }else {
                    failed(res,  "failed", "failed to update data"); 
                }
            }).catch((err) => {
                // res.json(err);
                failed(res, err.message, "failed", "internal server error"); 
            })
    },
    deleteFlight: (req, res) => {
        const flight_id = req.params.id;
        flightModel
           .deleteFlight(flight_id)
           .then((results) => {
                success(res, 'success', 'data has been deleted');
           }).catch((err) => {
                res.json(err)
           })
            
    },
    // insertFlight: (req, res) => {
    //     const { arrival_country, arrival_city,
    //         departure_country, departure_city,
    //         arrival_time, departure_time,
    //         price, terminal, gate,
    //         wifi, baggage, lunch } = req.body;
    //     const data = {
    //         arrival_country, arrival_city,
    //         departure_country, departure_city,
    //         arrival_time, departure_time, price,
    //         terminal, gate, wifi, baggage, lunch
    //     };

    //     flightModel
    //         .insertFlight(data)
    //         .then((results) => {
    //             console.log(results);
    //             const flight = results.rows[0];
    //             if (results.rowCount > 1) {
    //                 success(res, {
    //                     data: flight,
    //                 }, "success", "flight data has been entered");
    //             } else {
    //                 failed(res, null, "failed", "failed to add data")
    //             }

    //         }).catch((err) => {
    //             failed(res, err.message, "failed", "internal server error");
    //         })
    // },
}

module.exports = flightModelController;