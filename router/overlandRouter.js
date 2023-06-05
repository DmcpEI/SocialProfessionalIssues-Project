const express = require('express');
const router = express.Router();
const { getAllOverlands, getOverlandById, } = require('../database/overlands');

// Get all overlands trips
router.get('/', async (req, res) => {
  const overlands = await getAllOverlands();
  res.send({ status: 'OK', data: overlands });
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

module.exports = router;
