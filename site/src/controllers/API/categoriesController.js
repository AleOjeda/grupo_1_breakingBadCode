const db = require('../../database/models');
module.exports = {
    //api/category/:category
    categoryProducts: (req,res) =>{
        db.Products.findAll({
            include: [{association: "category" , where: {path: req.params.category} }],
        })
        .then (products =>{
            res.status(200).json({
                status:200,
                totalData: products.length,
                data: products
            })
        })
    },

    subcategoryProducts: (req,res) =>{

    },

    //api/category/all
    categories: (req,res) =>{
        db.Categories.findAll({
            include: [{association: "products"}],
        })
        .then (categories =>{
            categories.forEach(category =>{
                category.products.forEach(item=>{
//                    item.price= '$' + item.price;
                    //Formateo de precio
                    item.price = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(item.price);
                    item.price = item.price.replace("CLP","$");
                    item.price = item.price.replace(",",".");
                    //Le quito el espacio... se trata de un "no breaking space, por eso se usa \u00a0 y no " " 
                    item.price = item.price.replace("\u00a0","");

                    //Formateo de %
                    item.discount = item.discount /100;
                    item.discount = Intl.NumberFormat("de-DE", {style: "percent"}).format(item.discount);
                    //item.discount = item.discount.replace(",",".");
                    //Le quito el espacio... se trata de un "no breaking space, por eso se usa \u00a0 y no " " 
                    //item.discount = item.discount.replace("\u00a0","");
                })
            })
            res.status(200).json({
                status:200,
                totalData: categories.length,
                data: categories
            })
        })
    },

    subcategories: (req,res) =>{

    },
};