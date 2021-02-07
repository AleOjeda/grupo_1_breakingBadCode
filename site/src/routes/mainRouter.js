//dividir el router entre el router de todo lo que tenga que ver con usuarios.
//registro inicio (luego será cambiar dirección etc etc)
// editar cosas del usuario, mostrar sus datos /:id
///www.qwerty.com/users/:id por ejemplo. o todas las opciones del usuario. 
//(no se si se haran)


//router de producto
//pagina de producto 
//categorias www.qweryy.com/:idproducto1

//tendriamos que tener un /categorias que tendra la opcion 
//de ver los productos de categoria? sub categoria etc? www.qwerty.com/categoria1






//en el main router tiene q ir el /contacto / quienes somos /home


const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController')


router.get('/', controller.index);
router.get('/mi-carrito', controller.miCart)

module.exports = router;
