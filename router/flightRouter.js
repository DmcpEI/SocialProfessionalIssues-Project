const express = require('express');
const router = express.Router();
const { getAllFlights, getFlightsByOriginAndDestination, getFlightsOrigins, getFlightsDestinations, } = require('../database/flights');

// Get all flights
router.get('/', async (req, res) => {
  const flights = await getAllFlights();
  res.send({ status: 'OK', data: flights });
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

router.get('/origins', async (req, res) => {
  try {
      const origins = await getFlightsOrigins();
      res.json(origins);
    } catch (error) {
      res.status(500).send('Internal Server Error');
  }
});

router.get('/destinations', async (req, res) => {
  try {
      const destinations = await getFlightsDestinations();
      res.json(destinations);
  } catch (error) {
      res.status(500).send('Internal Server Error');
  }
});

// POST route for selection page
router.post('/selectPage', async (req, res) => {
  const { countryOrigin, countryDestination, guests, user } = req.body;

  try {
    const flights = await getFlightsByOriginAndDestination(countryOrigin, countryDestination);

    if (flights.length === 0) {
      res.status(404).send({ status: 'FAILED', error: 'No flights found' });
      return;
    }

    res.send({ status: 'OK', flights, guests, user, redirect: '/flights/flight' });
  } catch (e) {
    res.status(500).send({ status: 'FAILED', error: e.message });
  }
});

router.get('/flight', (req, res) => {
  const { flights, guests, user } = req.query;
  res.render('flight', { flights: JSON.parse(flights), guests: JSON.parse(guests), user: user ? JSON.parse(user) : null });
});

module.exports = router;
