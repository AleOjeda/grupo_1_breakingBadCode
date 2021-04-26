const express = require('express');
const router = express.Router();

const controller = require('../../controllers/API/productsController');
router.get('/', controller.showAll);
router.get('/:id', controller.showOne);


//Listar detalle producto /api/product/:id
//Buscar producto
//Agregar producto
//Editar producto
//Eliminar producto
module.exports = router;