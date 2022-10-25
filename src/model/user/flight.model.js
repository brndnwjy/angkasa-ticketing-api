const pool = require("../../config/db");

const uuid = require("uuid");

const flightModel = {
  listFlight: () => {
    return new Promise((resolve, reject) => {
      const query = {
        text: "SELECT * FROM flights",
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  insertFlight: ({
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
    luggage,
    lunch,
  }) => {
    return new Promise((resolve, reject) => {
      // const flight_id = uuid(uuidBytes);
      // return (console.log(flight_id))
      const flight_id = uuid.v4();
      console.log(typeof flight_id);
      const query = {
        text: `INSERT INTO flights
                        (   
                            flight_id,
                            arrival_country, arrival_city, 
                            departure_country, departure_city,
                            arrival_time, departure_time, price, 
                            terminal, gate, wifi, luggage, lunch
                        )
                        VALUES (
                            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
                        )`,
        values: [
          flight_id,
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
          luggage,
          lunch,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  updateFlight: ({
    flight_id,
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
    luggage,
    lunch,
  }) => {
    return new Promise((resolve, reject) => {
      const updated_at = "now()";
      const query = {
        text: `UPDATE flights SET
                    arrival_country = COALESCE($1, arrival_country),
                    arrival_city = COALESCE($2, arrival_city),
                    departure_country = COALESCE($3, departure_country),
                    departure_city  = COALESCE($4, departure_city),
                    arrival_time = COALESCE($5, arrival_time),
                    departure_time = COALESCE($6, departure_time),
                    price = COALESCE($7, price),
                    terminal = COALESCE($8, terminal),
                    gate = COALESCE($9, gate),
                    wifi = COALESCE($10, wifi),
                    luggage = COALESCE($11, luggage),
                    lunch = COALESCE($12, lunch),
                    updated_at = $13
                    WHERE flight_id = $14`,
        values: [
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
          luggage,
          lunch,
          updated_at,
          flight_id,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  deleteFlight: (flight_id) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: "DELETE FROM flights WHERE flight_id = $1",
        values: [flight_id],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  
  flightWithFilter: (field, value, sortBy) => {
    console.log(field + ', ' + value + ', ' + sortBy);
    return new Promise((resolve, reject) => {
      
      const query = {
        text: `SELECT * FROM flights WHERE ${field} ILIKE '%${value}%' ORDER BY ${sortBy} ASC`,
        
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = flightModel;
