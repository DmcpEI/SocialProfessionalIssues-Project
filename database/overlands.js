const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllOverlands = async () => {
  return await db.overlands.find().toArray();
};

const getOverlandsByOriginAndDestination = async (origin, destination) => {
  return await db.overlands.find({ origin: origin, destination: destination }).toArray();
};

const getOverlandsOrigins = async () => {
  const overlands = await db.overlands.find().toArray();
  const origins = new Set();
  
  overlands.forEach(overland => {
      if (overland.origin) {
        origins.add(overland.origin);
      }
  });

  return Array.from(origins);
};

const getOverlandsDestinations = async () => {
  const overlands = await db.overlands.find().toArray();
  const destinations = new Set();

  overlands.forEach(overland => {
      if (overland.destination) {
          destinations.add(overland.destination);
      }
  });

  return Array.from(destinations);
};

module.exports = {
    getAllOverlands,
    getOverlandsByOriginAndDestination,
    getOverlandsOrigins,
    getOverlandsDestinations,
  };