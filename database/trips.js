const db = require('./db');

const getAllOrigins = async () => {
    const flights = await db.flights.find().toArray();
    const overlands = await db.overlands.find().toArray();
    const origins = new Set();

    flights.forEach(flight => {
        if (flight.origin) {
        origins.add(flight.origin);
        }
    });
    overlands.forEach(overland => {
        if (overland.origin) {
          origins.add(overland.origin);
        }
    });

    return Array.from(origins);
};
  
  const getAllDestinations = async () => {
    const flights = await db.flights.find().toArray();
    const overlands = await db.overlands.find().toArray();
    const destinations = new Set();

    flights.forEach(flight => {
        if (flight.destination) {
            destinations.add(flight.destination);
        }
    });
    overlands.forEach(overland => {
        if (overland.destination) {
            destinations.add(overland.destination);
        }
    });
  
    return Array.from(destinations);
};

module.exports = {
    getAllOrigins,
    getAllDestinations,
  };