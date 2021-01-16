const express = require('express');
const categories = require('../database/categories');

module.exports = {
    index : (req,res) => {
        res.render('index', {categories});
    },
    login: (req,res) => {
        res.render('login');
    },
    register:(req,res) => {
        res.render('registro');
    },
}