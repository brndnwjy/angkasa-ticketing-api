const express = require("express");
const router = express.Router();

const {
    listFlight,
    insertFlight,
    updateFlight,
    deleteFlight,
    flightWithFilter
} = require('../controller/user/flight.controller')

// middleware


// router
// .get()
// .post()
// .put()
// .delete()



router
    .get('/', flightWithFilter)
    .get('/list', listFlight)
    .post('/insert', insertFlight)
    .put('/update/:id', updateFlight)
    .delete('/delete/:id', deleteFlight);
module.exports = router;