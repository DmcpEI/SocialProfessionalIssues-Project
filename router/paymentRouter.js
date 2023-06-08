const express = require('express');
const router = express.Router();
const { getAllPayments, getPaymentsByUser, createPayment } = require('../database/payments');

// Get all payments
router.get('/', async (req, res) => {
  const payments = await getAllPayments();
  res.send({ status: 'OK', data: payments });
});

// Create a payment
router.post('/', async (req, res) => {
  try {
    const paymentData = req.body;

    console.log(paymentData);

    if (!paymentData.total || !paymentData.guests || !paymentData.type || !paymentData.userId || !paymentData.paymentMethod || !paymentData.description) {
      return res.status(400).send({ status: 'FAILED', error: 'Missing required fields' });
    }

    const newPayment = await createPayment(paymentData);

    res.status(201).send({ status: 'OK', redirect: '/payments/index' });
  } catch (error) {
    res.status(500).send({ status: 'FAILED', error: 'Internal server error' });
  }
});

router.get('/index', (req, res) => {
  const { user } = req.query;
  res.render('index', { user: user ? JSON.parse(user) : null });
});

module.exports = router;