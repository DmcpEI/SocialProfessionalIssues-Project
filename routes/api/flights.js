const express = require('express');
const router = express.Router();
const Flight = require('../../models/Flight')

router.use(express.json());

module.exports = router;