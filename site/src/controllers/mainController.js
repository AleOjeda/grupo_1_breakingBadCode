const express = require('express');
const categories = require('../database/categories');
const productos = require('../database/productos')
module.exports = {
    index : (req,res) => {
        res.render('index', {categories, productos});
    },
    login: (req,res) => {
        res.render('login', {categories});
    },
    register:(req,res) => {
        res.render('registro',{categories});
    },
}