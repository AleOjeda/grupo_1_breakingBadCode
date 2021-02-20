const categories = require('./../database/categories');
const products = require('./../database/products');

const jsonTable = require('../database/jsonTable');
const productsTable = jsonTable('categories');

module.exports = {
    index : (req, res) =>{
        res.render ('categories/allCategories',{categories, products});
    },
    subCategory: (req, res) =>{
        let params = req.params;
        let requestedCategory = productsTable.findKeyValue("ruta",req.params.id);
        res.render ('categories/singleCategory',{categories, products, requestedCategory, params});
    },
    subCategoryProducts: (req,res) => {
        let parametros = req.params;
        res.render('categories/productsSubcategory',{categories, products, parametros});
    }

};