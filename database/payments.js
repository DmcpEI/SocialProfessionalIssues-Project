const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllPayments = async () => {
  return await db.users.find().toArray();
};

const getPaymentsByUser = async (name) => {
  return await db.users.findOne({ user: name });
};

module.exports = {
    getAllPayments,
    getPaymentsByUser,
};