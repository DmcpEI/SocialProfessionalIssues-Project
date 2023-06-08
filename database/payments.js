const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllPayments = async () => {
  return await db.payments.find().toArray();
};

const getPaymentsByUser = async (name) => {
  return await db.payments.findOne({ user: name });
};

const createPayment = async (payment) => {
  const result = await db.payments.insertOne(payment);
  return { ...payment, _id: result.insertedId };
};

module.exports = {
    getAllPayments,
    getPaymentsByUser,
    createPayment,
};