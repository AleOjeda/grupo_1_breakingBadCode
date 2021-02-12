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
        //console.log(req.params);
        //let product= console.log(req.params)
        res.render('products/productDetail',{categories, products});
    },
    create: (req,res) => { //create para mostrar el formulario
        res.render('products/productCreate.ejs');
    },
    store: (req,res) =>{ //store para procesar el formulario.
        //Generar el nuevo producto
        let product = req.body;
        if(req.file){
            product.imagen = req.file.filename;
        } else {
            res.send('Falta la imagen');
        }

        productId= productsTable.create(product); //devuelve el numero de ID, pero solamente para poder redirigir en la sig linea, lo que hizo con el create fue crearlo y almacenarlo
        res.redirect('/productos/'+ productId);
    }
}
