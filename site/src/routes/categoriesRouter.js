const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriesController');

router.get('/', controller.index);
router.get('/:id', controller.subCategory);
router.get('/:id/:sub_id', controller.subCategoryProducts);
router.get('/:id/:sub_id/:patito', controller.subCategoryProducts);
//Bug: cuando por ejemplo saco un ./ de la dirección de las imagenes en el header. y voy a la siguiente dirección:
router.get('/:id/:sub_id/:patito/:patito', controller.subCategoryProducts);

module.exports = router;