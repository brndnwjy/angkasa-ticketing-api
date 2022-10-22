const express = require("express");
const { insertAirline, getAllAirline, getAirlineDetail, updateAirline, removeAirline } = require("../../controller/admin/airline.controller");
const router = express.Router();

router
.get("/", getAllAirline)
.get("/:id", getAirlineDetail)
.post("/", insertAirline)
.put("/:id", updateAirline)
.delete("/:id", removeAirline);

module.exports = router;