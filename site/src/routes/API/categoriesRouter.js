//Listar productos por categoria
//Listar productos por Subcategoria
//Listar categorias
//Listar subcategorias

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/API/categoriesController');

//Listar categorias //api/category/all
router.get('/all', controller.categories);

//Listar productos por categoria //api/category/:category
router.get('/:category', controller.categoryProducts);

//Listar productos por subcategoria //api/category/:category/:subcategory
router.get('/:subCategory', controller.subcategoryProducts);


//Listar subcategorias //api/category/:category/all
router.get('/:category/all', controller.subcategories);


module.exports = router;