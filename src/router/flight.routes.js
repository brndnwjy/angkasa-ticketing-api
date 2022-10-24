const express = require("express");
const router = express.Router();

const {
  listFlight,
  insertFlight,
  updateFlight,
  deleteFlight,
  flightWithFilter
} = require("../controller/user/flight.controller");

// router.get("/", (req, res) => {
//   const data = "test routes";
//   res.json(data);
// });

router
  .get("/", flightWithFilter)
  .get("/list", listFlight)
  .post("/insert", insertFlight)
  .put("/update/:id", updateFlight)
  .delete("/delete/:id", deleteFlight);
module.exports = router;
