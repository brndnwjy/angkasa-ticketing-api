const pool = require("../../config/db");

const airlineModel = {
  insertAirline: (id, logo, name) => {
    return pool.query(
      `INSERT INTO airlines (airline_id, logo, name)
        VALUES ($1, $2, $3)`,
      [id, logo, name]
    );
  },

  getAllAirline: () => {
    return pool.query("SELECT * FROM airlines");
  },

  getAirlineDetail: (id) => {
    return pool.query(`SELECT * FROM airlines WHERE airline_id = '${id}'`);
  },

  updateAirline: (id, name) => {
    return pool.query("UPDATE airlines SET name = $1 WHERE airline_id = $2", [
      name,
      id,
    ]);
  },

  removeAirline: (id) => {
    return pool.query(`DELETE FROM airlines WHERE airline_id = '${id}'`);
  },
};

module.exports = airlineModel;
