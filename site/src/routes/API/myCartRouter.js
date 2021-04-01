const express = require('express');
const router = express.Router();
const controller = require('../../controllers/API/myCartController');
//id es el usuario.
router.get('/:id', controller.show);
router.post('/:id/:item/:operation', controller.addSubtractQuantity);
router.delete('/:id/:item', controller.removeItem);

module.exports = router;