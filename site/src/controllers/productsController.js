// Listar productos por cátegoria
// Listar productos por subCategoría
// Buscar productos
// Agregar productos al carrito

const categories = require('../database/categories');
const productos = require('../database/products');

module.exports = {
    productDetail:(req,res) => {
        console.log(req.params);
        //let product= console.log(req.params)
        res.render('products/productDetail',{categories, productos});
    },
}

/*
show: (req, res) => {
    let user = usersTable.find(req.params.id);

    if ( user ) {
        res.render('users/detail', { user });
    } else {
        res.send('No encontré el usuario');
    }
},*/