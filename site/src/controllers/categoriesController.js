const express = require('express');
const categories = require('../database/categories');
const products = require('../database/products');


module.exports = {
    index : (req, res) =>{
        res.render ('categories/allCategories',{categories, products});
    },
    subCategory: (req, res) =>{
        res.render ('categories/singleCategory',{categories, products});
    }
};