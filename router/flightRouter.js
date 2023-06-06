const express = require('express');
const router = express.Router();
const { getAllFlights, getFlightById, getFlightsByOriginAndDestination, } = require('../database/flights');

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

// Get all flights from a certain origin to a certain destination
router.get('/:origin/:destination', async (req, res) => {
  const origin = req.params.origin;
  const destination = req.params.destination;

  try {
    const flights = await getFlightsByOriginAndDestination(origin, destination);

    if (flights.length === 0) {
      res.status(404).send({ status: 'FAILED', error: 'No flights found' });
      return;
    }

    res.render('flight', { flights });
  } catch (e) {
    res.status(500).send({ status: 'FAILED', error: e.message });
  }
});

module.exports = router;
