const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/', (req,res) => {
//    res.send('Hola estoy en productos');
res.redirect('/')
});


router.get('/crear', controller.create); //Muestra formulario de creación
router.get('/:id', controller.productDetail);

router.post('/crear', controller.store); //Procesa el formulario de creación (agregar multer para los archivos)

module.exports = router;