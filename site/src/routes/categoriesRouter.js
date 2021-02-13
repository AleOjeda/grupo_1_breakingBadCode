const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriesController');

router.get('/', controller.index);
router.get('/:id', controller.subCategory);
router.get('/:id/:sub_id', controller.subCategoryProducts);

module.exports = router;