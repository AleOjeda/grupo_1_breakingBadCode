const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/', (req,res) => {
//    res.send('Hola estoy en productos');
res.redirect('/')
});
router.get('/:id', controller.productDetail)

module.exports = router;