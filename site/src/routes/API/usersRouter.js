const express = require('express');
const router = express.Router();
const controller = require('../../controllers/API/usersController');

//Listar usuario por email
router.get('/:email', controller.details);

module.exports = router;