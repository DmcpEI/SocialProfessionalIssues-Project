const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllFlights = async () => {
  return await db.flights.find().toArray();
};

const getFlightById = async (id) => {
  return await db.flights.findOne({ _id: new ObjectId(id) });
};

const getFlightsByOriginAndDestination = async (origin, destination) => {
  return await db.flights.find({ origin: origin, destination: destination }).toArray();
};

module.exports = {
    getAllFlights,
    getFlightById,
    getFlightsByOriginAndDestination,
  };