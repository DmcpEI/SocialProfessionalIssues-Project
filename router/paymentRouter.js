const express = require('express');
const router = express.Router();
const { getAllPayments, getPaymentsByUser, } = require('../database/payments');

// Get all payments
router.get('/', async (req, res) => {
  const payments = await getAllPayments();
  res.send({ status: 'OK', data: payments });
});

module.exports = router;