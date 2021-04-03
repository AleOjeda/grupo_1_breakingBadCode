const categories = require('../database/categories');
const products = require('../database/products');
const db = require('../database/models');
const fetch = require('node-fetch');



module.exports = {
    index : async(req,res) => {
        fetch('http://localhost:3000/api/category/all')
        .then(response => response.json())
        .then(categoriesData=>{
            let categories = categoriesData.data
            console.log(categories);
            console.log(categories[7].products); 
            res.render('index', {categories})
        })

    },

    miCart:(req,res) => {
        let userId = {};
        if(res.locals.userLogged){
            userId = res.locals.userLogged.id
        } 

        db.Shopping_cart_items
            .findAll({
                include: [{association: "user"}],
                include: [{association: "product"}],
                where:{ user_id: userId},
            })
            .then ((shopping_cart) => {
                let products=shopping_cart;
                res.render('products/productCart',{categories, products});
            })
    },
}