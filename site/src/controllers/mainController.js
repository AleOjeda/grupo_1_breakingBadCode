const categories = require('../database/categories');
const products = require('../database/products');
const db = require('../database/models');

module.exports = {
    index : (req,res) => {
        res.render('index', {categories, products});
    },

    miCart:(req,res) => {
        db.Shopping_cart_items
            .findAll({
                include: [{association: "user"}],
                include: [{association: "product"}],
            })
            .then ((shopping_cart) => {
                console.log(shopping_cart);
            })
        res.render('products/productCart',{categories, products});
    },
}