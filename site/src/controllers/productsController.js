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

module.exports = {
    productDetail:(req,res) => {
        //console.log(req.params.id);
        db.Products.findOne({
            where: {id:req.params.id}
        })
        .then((product) => {
            res.render('products/productDetail',{categories, product});
        })
    },

    create: (req,res) => { //create para mostrar el formulario
            res.render('products/productCreate')     
    },
    
    store: (req,res) =>{ 
        //store para procesar el formulario.
       let product = req.body;
        if(req.file){
            product.image = req.file.filename;
        } else {
            res.send('Falta la imagen');
        }
        //Agrego $ a los precios
        product.discount= product.discount/100;
        product.discount = Intl.NumberFormat("de-DE", {style: "percent"}).format(product.discount);
        //product.price = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(product.price);
//        product.competitorPrice = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(product.competitorPrice);
//        product.competitorPrice = product.competitorPrice.replace("CLP","$");
        //product.price = product.price.replace("CLP","$");
        
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
            console.log(created);
            res.redirect('/');
        })
        .catch(error =>{
            console.log(error);
        });
        
    },

    edit: (req,res) => {
        db.Products.findOne({
            where: {id:req.params.id}
        })
        .then((product) => {
            console.log(product);
            res.render('products/productEdit',{product});
        })
    },

    update: (req,res) => {

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
    },
    remove :(req,res) => {
        db.Products.destroy({
            where: {id:req.params.id}
        })
        .then(()=>{
            console.info(`producto con id : ${req.params.id} eliminado`);
            res.redirect('/');
        })
    }
}
