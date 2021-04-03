const express = require('express');
const router = express.Router();
//const controller = require('../../controllers/API/productsController');
const controllerViejo = require('../../controllers/API/myCartController');
//id es el usuario.
router.get('/', controllerViejo.show);

router.post('/:item/:operation', controllerViejo.addSubtractQuantity);
router.delete('/:id/:item', controllerViejo.removeItem);


//Listar detalle producto /api/product/:id
//Buscar producto
//Agregar producto
//Editar producto
//Eliminar producto
module.exports = router;