const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController')


router.get('/', controller.index);

router.get('/login', controller.login);

router.get('/registro', controller.register);

router.get('/detalleProducto', controller.productDetail)

router.get('/mi-carrito', controller.miCart)

module.exports = router;
