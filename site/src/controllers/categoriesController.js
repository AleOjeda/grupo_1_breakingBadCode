const categories = require('./../database/categories');
const products = require('./../database/products');


module.exports = {
    index : (req, res) =>{
        res.render ('categories/allCategories',{categories, products});
    },
    subCategory: (req, res) =>{
        res.render ('categories/singleCategory',{categories, products});
    },
    subCategoryProducts: (req,res) => {
        let parametros = req.params;
        res.render('categories/singleCategory',{categories, products, parametros});
    }
};