const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllFlights = async () => {
  return await db.flights.find().toArray();
};

const getFlightsByOriginAndDestination = async (origin, destination) => {
  return await db.flights.find({ origin: origin, destination: destination }).toArray();
};

const getFlightsOrigins = async () => {
  const flights = await db.flights.find().toArray();
  const origins = new Set();

  flights.forEach(flight => {
      if (flight.origin) {
        origins.add(flight.origin);
      }
  });

  return Array.from(origins);
};

const getFlightsDestinations = async () => {
  const flights = await db.flights.find().toArray();
  const destinations = new Set();

  flights.forEach(flight => {
      if (flight.destination) {
          destinations.add(flight.destination);
      }
  });

  return Array.from(destinations);
};

module.exports = {
    getAllFlights,
    getFlightsByOriginAndDestination,
    getFlightsOrigins,
    getFlightsDestinations,
  };