//const categories = require('../database/categories');
//const products = require('../database/products');
const db = require('../database/models');
const fetch = require('node-fetch');
const Op = db.Sequelize.Op;
const categories = require('../database/categories');


module.exports = {
    index : async(req,res) => {
        fetch('http://localhost:3000/api/category/all')

        .then(response => response.json())
        .then(categoriesData=>{
            let categories = categoriesData.data;
            let productsWithDiscount = [];
            categories.forEach(categorie => {
                categorie.products.forEach( product => product.discount !== "0%" ? productsWithDiscount.push(product) : "")
                //console.log(categorie.products)
                // categorie.forEach(product => {
                //     console.log(product)
                // })
            })
           //products.forEach(product =>{ 
            //    if (product.discount !== "0%") {
             //       productsWithDiscount.push(product)
              //  }
            //}
            //);
            //console.log(productsWithDiscount); 
            res.render('index', {categories,productsWithDiscount});
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

    search:(req,res)=>{
            // Declaro un array vacío para poder trabajar la busqueda
            let searchArray = [];
            // Divido lo que escribió el Usuario como busqueda para poder buscar cada palabra
            req.query.query.split(' ').forEach(eachWordOfTheSearch => searchArray.push({ [Op.substring]:(eachWordOfTheSearch) }))
            // Iré a buscar si dentro de mis productos existe algo que coincida con alguna palabra del array de busqueda
            db.Products.findAll({
                where: {
                    //Verifico si esta en el nombre de la marca o, en la descripción.
                    [Op.or]: [
                        {brand: {
                            // Utilizamos el operador de "o"
                            [Op.or]: searchArray // req.query para acceder a la URL, .query para acceder al parametro de busqueda
                        }},
                        {description:{[Op.or]: searchArray}}
                    ]
                }
            })
            .then(product => {
                if (product.length > 0) {

                    //Inicio formateo//
                        let totalDiscount = 0;
                
                        product.forEach(item=>{
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
                    //Fin formateo
                    let categoryName ="Resultados de tu busqueda";
                    let subCategoryName = "";
                    return res.render('categories/productsSubcategory', {categories, categoryName, subCategoryName,  products:product})
                }
                return res.send('No existen productos encontrados con tu busqueda: ')
            })
            .catch(err => console.log(err))
    }
}