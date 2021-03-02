const express = require('express');
const router = express.Router();

//Controller
const controller = require('../controllers/usersController')

//Home para el usuario. A definir: Mis compras, mis datos.. etc...
router.get('/', controller.index);

//Formulario de registro
router.get('/registro', controller.register);

//Procesar registro
router.post('/registro', controller.processRegister);

//Formulario de login
router.get('/login', controller.login);

//Procesar Login
router.post('/login', controller.processLogin);

//Mis pedidos
router.get('/mis-pedidos', controller.myOrders);

//LogOut (hacer)
//router.get('/logout', controller.logout);


module.exports = router;