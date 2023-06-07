const express = require('express');
const router = express.Router();
const { getAllOverlands, getOverlandsByOriginAndDestination, getOverlandsOrigins, getOverlandsDestinations } = require('../database/overlands');

// Get all overlands trips
router.get('/', async (req, res) => {
  const overlands = await getAllOverlands();
  res.render('route', { overlands });
});

// Get all overland trips from a certain origin to a certain destination
router.get('/:origin/:destination', async (req, res) => {
  const origin = req.params.origin;
  const destination = req.params.destination;

  try {
    const overlands = await getOverlandsByOriginAndDestination(origin, destination);

    if (overlands.length === 0) {
      res.status(404).send({ status: 'FAILED', error: 'No overland trips found' });
      return;
    }

    res.render('route', { overlands });
  } catch (e) {
    res.status(500).send({ status: 'FAILED', error: e.message });
  }
});

router.get('/origins', async (req, res) => {
  try {
      const origins = await getOverlandsOrigins();
      res.json(origins);
  } catch (error) {
      res.status(500).send('Internal Server Error');
  }
});

router.get('/destinations', async (req, res) => {
  try {
      const destinations = await getOverlandsDestinations();
      res.json(destinations);
  } catch (error) {
      res.status(500).send('Internal Server Error');
  }
});

// POST route for selection page
router.post('/selectPage', async (req, res) => {
  const { countryOrigin, countryDestination, guests, user } = req.body;

  try {
    const overlands = await getOverlandsByOriginAndDestination(countryOrigin, countryDestination);

    if (overlands.length === 0) {
      res.status(404).send({ status: 'FAILED', error: 'No overland trips found' });
      return;
    }

    res.send({ status: 'OK', overlands, guests, user, redirect: '/overlands/overland' });
  } catch (e) {
    res.status(500).send({ status: 'FAILED', error: e.message });
  }
});

router.get('/overland', (req, res) => {
  const { overlands, guests, user } = req.query;
  res.render('overland', { overlands: JSON.parse(overlands), guests: JSON.parse(guests), user: user ? JSON.parse(user) : null });
});


module.exports = router;
