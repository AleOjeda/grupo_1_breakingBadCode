/*Faltantes de crear:
    Listar productos por cátegoria
    Listar productos por subCategoría
    Buscar productos
    Agregar productos al carrito
*/

const categories = require('../database/categories');
const db = require('../database/models');

const jsonTable = require('../database/jsonTable');
const productsTable = jsonTable('products');
const { validationResult } = require('express-validator');

module.exports = {
    productDetail:(req,res) => {
        db.Products.findOne({
            where: {id:req.params.id}
        })
        .then((product) => {
                //item.price= '$' + item.price;
                //Formateo de precio y oldPrice
                product.oldPrice = 100 * product.price / (100-(product.discount));
                product.price = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(product.price);
                product.price = product.price.replace("CLP","$");
                product.price = product.price.replace(",",".");
                //Le quito el espacio... se trata de un "no breaking space, por eso se usa \u00a0 y no " " 
                product.price = product.price.replace("\u00a0","");

                //formateo oldPrice
                product.oldPrice = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(product.oldPrice);
                product.oldPrice = product.oldPrice.replace("CLP","$");
                product.oldPrice = product.oldPrice.replace(",",".");
                //Le quito el espacio... se trata de un "no breaking space, por eso se usa \u00a0 y no " " 
                product.oldPrice = product.oldPrice.replace("\u00a0","");
                
                //Formateo de %
                product.discount = product.discount /100;
                product.discount = Intl.NumberFormat("de-DE", {style: "percent"}).format(product.discount);

            res.render('products/productDetail',{categories, product});
        })
    },

    create: (req,res) => { //create para mostrar el formulario
            res.render('products/productCreate')     
    },
    
    store: (req,res) =>{ 
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render('products/productCreate', {
                errors: errors.mapped(),
                old: req.body,
                categories
            })
        }
        else{
            let product = req.body;
            if(req.file){
                product.image = req.file.filename;
            } else {
                res.send('Falta la imagen');
            }
            //Agrego $ a los precios
            product.discount= product.discount/100;
            product.discount = Intl.NumberFormat("de-DE", {style: "percent"}).format(product.discount);

            
            const { brand, description, display, image, price, discount, other_details, category_id, sub_category_id } = product;
            
            db.Products.create({
                brand: brand,
                description: description,
                display: display,
                image: ("/img/productos/"+image),
                price: price,
                discount: discount,
                other_details: other_details,
                category_id: category_id ,
                sub_category_id: sub_category_id
            }).then((created) =>{
                res.redirect('/');
            })
            .catch(error =>{
                console.log(error);
            });
        }
    },

    edit: (req,res) => {
        db.Products.findOne({
            where: {id:req.params.id}
        })
        .then((product) => {
            res.render('products/productEdit',{product});
        })
    },

    update: (req,res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            db.Products.findOne({
                where: {id:req.params.id}
            })
            .then((product) => {
            //  return res.redirect(req.params.id,'back', {
            return res.render('products/productEdit', {
                errors: errors.mapped(),
                old: req.body,
                categories,
                product
            })
            })
        }
        else{
            db.Products.update({
            brand: req.body.brand,
            description: req.body.description,
            display: req.body.display,
            image: ("/img/productos/"+ req.file.filename),
            price: req.body.price,
            discount: req.body.discount,
            other_details: req.body.other_details,
            category_id: req.body.category_id ,
            sub_category_id: req.body.sub_category_id
        },
        {
            where: {id: req.body.id}
        }).then(()=> res.redirect('/'))
        .catch( ()=> console.log('aca surgio error'))
        }
    },
    remove :(req,res) => {
        console.log("hola");
        db.Products.destroy({
            where: {id:req.params.id}
        })
        .then(()=>{
            console.info(`producto con id : ${req.params.id} eliminado`);
            res.redirect('/');
        })
    }
}
