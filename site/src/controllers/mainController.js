const categories = require('../database/categories');
const products = require('../database/products');
const db = require('../database/models');
const fetch = require('node-fetch');



module.exports = {
    index : async(req,res) => {
        fetch('http://localhost:3000/api/category/all')
        .then(response => response.json())
        .then(categoriesData=>{
            let categories = categoriesData.data;
            res.render('index', {categories});
        });
    },

    miCart:(req,res) => {
        let userId = {};
        if(res.locals.userLogged){
            userId = res.locals.userLogged.id
        } 
        fetch('http://localhost:3000/api/api/cart/')
        db.Shopping_cart_items
            .findAll({
                include: [{association: "user"}],
                include: [{association: "product"}],
                where:{ user_id: userId},
            })
            .then ((shopping_cart) => {
                let products=shopping_cart;
                let totalDiscount = 0;
                
                products.forEach(item=>{
                    totalDiscount = totalDiscount + (item.product.price*(item.product.discount/100)/(1-(item.product.discount/100))); 

                    //Formateo de precio
                    item.price = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(item.price);
                    item.price = item.price.replace("CLP","$");
                    item.price = item.price.replace(",",".");
                    //Le quito el espacio... se trata de un "no breaking space, por eso se usa \u00a0 y no " " 
                    item.price = item.price.replace("\u00a0","");

                    //Formateo de %
                    item.discount = item.discount /100;
                    item.discount = Intl.NumberFormat("de-DE", {style: "percent"}).format(item.discount);
                    //Agrego subtotal
                    item.subtotal = item.quantity* item.price
                });
                
                //Formateo totalDiscount
                totalDiscount = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(totalDiscount);
                totalDiscount = totalDiscount.replace("CLP","$");
                totalDiscount = totalDiscount.replace(",",".");
                //Le quito el espacio... se trata de un "no breaking space, por eso se usa \u00a0 y no " " 
                totalDiscount = totalDiscount.replace("\u00a0","");
                
                res.render('products/productCart',{categories, products, totalDiscount});
            })
    },
}