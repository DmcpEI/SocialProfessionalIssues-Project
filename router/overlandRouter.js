const express = require('express');
const router = express.Router();
const { getAllOverlands, getOverlandById, getOverlandsByOriginAndDestination, } = require('../database/overlands');

// Get all overlands trips
router.get('/', async (req, res) => {
  const overlands = await getAllOverlands();
  res.render('route', { overlands });
});

// Get overland trip with a certain id
router.get('/:overlandId', async (req, res) => {
  try {
    const overland = await getOverlandById(req.params.overlandId);

    if (!overland) {
      res.status(404).send({ status: 'FAILED', error: 'Overland Trip not found' });
      return;
    }

    res.send({ status: 'OK', data: overland });
  } catch (e) {
    res.status(401).send({ status: 'FAILED', error: e.message });
  }
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


module.exports = router;
