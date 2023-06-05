const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllHotels = async () => {
  return await db.hotels.find().toArray();
};

const getHotelById = async (id) => {
  return await db.hotels.findOne({ _id: new ObjectId(id) });
};

module.exports = {
    getAllHotels,
    getHotelById,
  };