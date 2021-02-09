/*Faltantes de crear:
 Listar productos por cátegoria
 Listar productos por subCategoría
 Buscar productos
Agregar productos al carrito
*/

const categories = require('../database/categories');
const products = require('../database/products.json');


const jsonTable = require('../database/jsonTable');
const productsTable = jsonTable('products');

module.exports = {
    productDetail:(req,res) => {
        console.log(req.params);
        //let product= console.log(req.params)
        res.render('products/productDetail',{categories, products});
    },
    create: (req,res) => {
        res.render('products/productCreate.ejs');
    },
    store: (req,res) =>{
        //Generar el nuevo producto
        let product = req.body;
        console.log(product);
        productsTable.create(product);
        res.send('llegamos a la magia');
//        let productoId = productsTable.create(producto);

//        res.redirect ('/producto/' + productoId);



    }
}
//create para mostrar el formulario
//store para procesar el formulario.




/*
show: (req, res) => {
    let user = usersTable.find(req.params.id);

    if ( user ) {
        res.render('users/detail', { user });
    } else {
        res.send('No encontré el usuario');
    }
},*/