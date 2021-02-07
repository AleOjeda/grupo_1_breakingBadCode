const express = require('express');
const categories = require('../database/categories');
const productos = require('../database/productos');


module.exports = {
    index : (req,res) => {
        res.render('index', {categories, productos});
    },

    miCart:(req,res) => {
        res.render('productCart',{categories, productos});
    },
}