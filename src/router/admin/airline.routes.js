const express = require("express");
const { insertAirline, getAllAirline, getAirlineDetail, updateAirline, removeAirline } = require("../../controller/admin/airline.controller");
const router = express.Router();

// middleware
const uploadAirline = require('../../middleware/upload.airline');


// router.get("/", (req, res) => {
//   const data = "test routes";
//   res.json(data);
// });
router
.get("/", getAllAirline)
.get("/:id", getAirlineDetail)
.post("/", uploadAirline, insertAirline)
.put("/:id", updateAirline)
.delete("/:id", removeAirline);

module.exports = router;