const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriesController');

router.get('/', controller.index);
router.get('/:id', controller.subCategory);
router.get('/:id/:sub_id', controller.subCategoryProducts);
//router.get('/:id/:sub_id/:patito', controller.subCategoryProducts);
//router.get('/:id/:sub_id/:patito/:patito', controller.subCategoryProducts);

module.exports = router;