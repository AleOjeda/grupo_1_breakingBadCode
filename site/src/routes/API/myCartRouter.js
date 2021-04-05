const express = require('express');
const router = express.Router();
const controller = require('../../controllers/API/myCartController');
//id es el usuario.


router.get('/', controller.show);
router.post('/:item/:operation', controller.addSubtractRemoveQuantity);

module.exports = router;