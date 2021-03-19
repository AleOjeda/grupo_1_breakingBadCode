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
        console.log(req.params.id);
        let requestedProduct = productsTable.find(req.params.id);
        console.log(requestedProduct);
        res.render('products/productDetail',{categories, requestedProduct});
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
        product.price = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(product.price);
//        product.competitorPrice = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(product.competitorPrice);
//        product.competitorPrice = product.competitorPrice.replace("CLP","$");
        product.price = product.price.replace("CLP","$");
        
        const { brand, description, display, image, price, discount, other_details, category_id, sub_category_id } = product;
        
        db.Products.create({
            brand: brand,
            description: description,
            display: display,
            image: image,
            price: price,
            discount: discount,
            other_details: other_details,
            category_id: category_id ,
            sub_category_id: sub_category_id
        }).then((created) =>{
            console.log(created);
            res.redirect('/usuario/login');
        })
        .catch(error =>{
            console.log(error);
        });
        
    },

    edit: (req,res) => {
        let product = req.body;
        product.idEdit = 'Nuevo ID';
        product.newName = 'Nuevo Nombre';
        console.log(product.idEdit);
        console.log(product.newName);
        res.render('products/productEdit');
    },
    update: (req,res) => {
        console.log(req.body);
        let product = req.body;
        //crear la parte de editar imagen.. con un show, agarras el nombre de la imagen vieja y edit (pensar)
        let productId = productsTable.update(product);
        res.send('Estamos en Saturno?');
    }
}
