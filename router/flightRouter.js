const express = require('express');
const router = express.Router();
const { getAllFlights, getFlightById, } = require('../database/flights');

// Get all flights
router.get('/', async (req, res) => {
  const flights = await getAllFlights();
  res.send({ status: 'OK', data: flights });
});

// Get flight with a certain id
router.get('/:flightId', async (req, res) => {
  try {
    const flight = await getFlightById(req.params.flightId);

    if (!flight) {
      res.status(404).send({ status: 'FAILED', error: 'Flight not found' });
      return;
    }

    res.send({ status: 'OK', data: flight });
  } catch (e) {
    res.status(401).send({ status: 'FAILED', error: e.message });
  }
});

module.exports = router;
