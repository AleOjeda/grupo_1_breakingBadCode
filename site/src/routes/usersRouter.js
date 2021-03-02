const express = require('express');
const router = express.Router();

//Middlewares
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

//Controller
const controller = require('../controllers/usersController')

//Home para el usuario. A definir: Mis compras, mis datos.. etc...
router.get('/', controller.index);

//Formulario de registro
router.get('/registro', guestMiddleware, controller.register);

//Procesar registro
router.post('/registro', controller.processRegister);

//Formulario de login
router.get('/login', guestMiddleware, controller.login);

//Procesar Login
router.post('/login', controller.processLogin);

//Mis pedidos
router.get('/mis-pedidos', authMiddleware, controller.myOrders);

//LogOut (hacer)
//router.get('/logout', controller.logout);


module.exports = router;