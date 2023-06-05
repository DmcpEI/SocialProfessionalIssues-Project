const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllFlights = async () => {
  return await db.flights.find().toArray();
};

const getFlightById = async (id) => {
  return await db.flights.findOne({ _id: new ObjectId(id) });
};

module.exports = {
    getAllFlights,
    getFlightById,
  };