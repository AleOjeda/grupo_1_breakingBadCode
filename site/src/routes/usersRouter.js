const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController')

router.get('/', controller.index);

router.get('/login', controller.login);

router.get('/registro', controller.register);

router.get('/mis-pedidos', controller.myOrders);

module.exports = router;