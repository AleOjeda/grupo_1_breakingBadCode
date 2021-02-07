const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriesController');

router.get('/', controller.index);
router.get('/:id', controller.subCategory);

module.exports = router;