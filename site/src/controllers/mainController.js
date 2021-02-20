const categories = require('../database/categories');
const products = require('../database/products');
const path = require('path');
const { dirname } = require('path');

module.exports = {
    index : (req,res) => {
        res.render('index', {categories, products});
        console.log(__dirname);
    },

    miCart:(req,res) => {
        res.render('products/productCart',{categories, products});
    },
}