const express = require('express');
const categories = require('../database/categories');
const productos = require('../database/products');


module.exports = {
    index : (req,res) => {
        res.render('index', {categories, productos});
    },

    miCart:(req,res) => {
        res.render('products/productCart',{categories, productos});
    },
}