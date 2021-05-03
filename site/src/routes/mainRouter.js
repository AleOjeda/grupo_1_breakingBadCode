//en el main router tiene q ir el /contacto / quienes somos /home


const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController')


router.get('/', controller.index);
router.get('/mi-carrito', controller.miCart)
router.get('/search', controller.search);
module.exports = router;
