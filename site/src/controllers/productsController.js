// Listar productos por cátegoria
// Listar productos por subCategoría
// Buscar productos
// Agregar productos al carrito

const categories = require('../database/categories');
const productos = require('../database/productos');

module.exports = {
    productDetail:(req,res) => {
        res.render('products/productDetail',{categories, productos});
    },
}