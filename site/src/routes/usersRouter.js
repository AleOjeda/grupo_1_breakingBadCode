const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController')

router.get('/', controller.index);

router.get('/login', controller.login); //Muestra vista Login

router.get('/registro', controller.register);

router.get('/mis-pedidos', controller.myOrders);

router.post('/login' /*, [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres)
 ]*/, controller.processLogin); //Procesa Login

module.exports = router;