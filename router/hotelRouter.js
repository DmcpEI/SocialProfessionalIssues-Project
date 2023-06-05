const express = require('express');
const router = express.Router();
const { getAllHotels, getHotelById, } = require('../database/hotels');

// Get all hotels
router.get('/', async (req, res) => {
  const hotels = await getAllHotels();
  res.send({ status: 'OK', data: hotels });
});

// Get hotel with a certain id
router.get('/:hotelId', async (req, res) => {
  try {
    const hotel = await getHotelById(req.params.hotelId);

    if (!hotel) {
      res.status(404).send({ status: 'FAILED', error: 'Hotel not found' });
      return;
    }

    res.send({ status: 'OK', data: hotel });
  } catch (e) {
    res.status(401).send({ status: 'FAILED', error: e.message });
  }
});

module.exports = router;
