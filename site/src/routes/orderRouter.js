const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController')

router.get('/:id', controller.orderDetails);

module.exports = router;
