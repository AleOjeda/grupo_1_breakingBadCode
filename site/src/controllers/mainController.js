const categories = require('../database/categories');
const products = require('../database/products');
const db = require('../database/models');

module.exports = {
    index : (req,res) => {
        res.render('index', {categories, products});
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