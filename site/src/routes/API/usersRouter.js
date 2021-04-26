const express = require('express');
const router = express.Router();
const controller = require('../../controllers/API/usersController');

//Listar todos los usuarios localhost/api/user/
router.get('/', controller.showAll);
//Listar usuario por email localhost/api/user/:email
router.get('/:email', controller.details);


module.exports = router;