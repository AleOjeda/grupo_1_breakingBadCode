const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//Middlewares
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

//Controller
const controller = require('../controllers/usersController')

//Validaciones
const registerValidations = [
    check('fullName')
        .notEmpty().withMessage('Debes completar tu nombre').bail()
        .isLength({min:2}).withMessage('Debe ser un nombre válido'),
    check('email')
        .notEmpty().withMessage('Debes completar tu email').bail()
        .isEmail().withMessage('Debe ser un email válido'),
    check('password')
        .notEmpty().withMessage('Debes colocar una contraseña').bail()
        .isLength({min:8}).withMessage('Debe tener al menos 8 caracteres'),
]

const loginValidations = [
    check('email')
        .notEmpty().withMessage('Debes completar tu email').bail()
        .isEmail().withMessage('Debe ser un email válido'),
    check('password')
        .notEmpty().withMessage('Debes completar tu contraseña')
]

//Home para el usuario. A definir: Mis compras, mis datos.. etc...
router.get('/', controller.index);

//Formulario de registro
router.get('/registro', guestMiddleware, controller.register);

//Procesar registro
router.post('/registro', registerValidations, controller.processRegister);

//Formulario de login
router.get('/login', guestMiddleware, controller.login);

//Procesar Login
router.post('/login', loginValidations, controller.processLogin);

//Mis pedidos
router.get('/mis-pedidos', authMiddleware, controller.myOrders);

//LogOut (hacer)
router.get('/logout', controller.logout);


module.exports = router;