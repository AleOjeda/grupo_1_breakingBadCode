const categories = require('../database/categories');
const productos = require('../database/productos');

module.exports = {

    index: (req,res) => {
        res.send('Hola estoy en cuenta. Definir vista index cuenta');
    },
//www.asd.com/cuenta/login    
    login: (req,res) => {
        res.render('users/login', {categories});
    },
//www.asd.com/cuenta/registrarse    
    register:(req,res) => {
        res.render('users/registro',{categories});
    },
//www.asd.com/cuenta/mis-pedidos
    myOrders:(req,res)=> {
        res.send('Hola estoy en cuenta. Definir vista de mis pedidos.')
    }
}