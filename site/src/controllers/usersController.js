const categories = require('../database/categories');
const productos = require('../database/products');

const jsonTable = require('../database/jsonTable');
const productsTable = jsonTable('users');
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
    },
    processLogin: (req,res) =>{
//        res.send('hola');
//13.41
        let usersJSON = productsTable.readFile()
        let users;
        if(usersJSON == "") {
            users= [];
        } else {
            users = usersJSON;
        }
        
        let usuarioALoguearse = undefined;
        for ( let i = 0; i< users.length; i++){
            if (users[i].email == req.body.email){
                if(req.body.password == users[i].password){
                    let usuarioALoguearse = users[i];
                    console.log(usuarioALoguearse);
                    console.log('ale logueado');
                    return res.render('users/login');
                    break;
                }
            }
        }

        if(usuarioALoguearse == undefined) {
            console.log('Usuario no logueado');
            return res.render('users/login');
            //15.35 
        }

//////////////////////////////

//Con validación
/*          if(errors.isEmpty()){
//13.41
            let usersJSON = productsTable.readFile()
            let users;
            if(usersJSON == "") {
                users= [];
            } else {
                users = usersJSON;
            }

            for ( let i = 0; i< users.length; i++){
                if (users[i].email == req.body.email){
                    if(req.body.password == users[i].password){
                        let usuarioALoguearse = users[i];
                        console.log(usuarioALoguearse);
                        console.log('ale logueado');
                        break;
                    }
                }
            }

            if(usuarioALoguearse == undefined) {
                console.log('Usuario no logueado');
                return res.render('/usuario/login');
                //15.35 
            }

        } else {
            return res.render('users/login',  {errors:errors.errors} )
        }  */
    }
}