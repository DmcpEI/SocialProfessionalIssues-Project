const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllOverlands = async () => {
  return await db.overlands.find().toArray();
};

const getOverlandById = async (id) => {
  return await db.overlands.findOne({ _id: new ObjectId(id) });
};

module.exports = {
    getAllOverlands,
    getOverlandById,
  };