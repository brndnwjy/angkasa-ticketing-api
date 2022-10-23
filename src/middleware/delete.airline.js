const fs = require("fs");
const AirlineModel = require("../model/admin/airline.model");

const removeAirline = async (req, res, next) => {
  const id = req.params.user_id;
  const data = await AirlineModel.getAirlineDetail(id);
  console.log(data);
  if (data.rows[0].logo) {
    const logo = data.rows[0].logo;
    fs.unlink(`./public/${logo}`, (err) => {
      if (err) {
        console.log(err);
        next();
      }
    });
    next();
  } else {
    res.json("Not found image");
  }
};

module.exports = removeAirline;