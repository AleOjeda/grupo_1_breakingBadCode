const products = require('../database/products');
const categories = require('../database/categories');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const jsonTable = require('../database/jsonTable');
const usersTable = jsonTable('users');
module.exports = {

    index: (req,res) => {
        res.send('Hola estoy en cuenta. Definir vista index cuenta');
    },
    register:(req,res) => {
        res.render('users/registro',{categories});
    },
    //integrando base de datos
    processRegister:(req,res) => {
        db.Users.findAll({
            where: {
                email: req.body.email
            }
        })
        .then (userInDB =>{
            if(userInDB.length!=0) {
                return res.send ('Este email ya esta registrado')
            } else { 
                db.Users.create({
                    name: req.body.fullName,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password,10)
                }),
                res.redirect('./login')
             } 
        })
    },
    login: (req,res) => {
        res.render('users/login', {categories});
    },
    processLogin: (req,res) =>{
        db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then (userInDB =>{
           // console.log(userInDB);
            if(userInDB.length!=0) {
                let isOkThePassword = bcryptjs.compareSync(req.body.password, userInDB.password);
                if(isOkThePassword){
                    delete userInDB.password;
                    req.session.userLogged = userInDB;
                    if(req.body.remember_user){
                        res.cookie('userEmail',req.body.email,{maxAge:(1000*60)*60})
                    };
                    return res.redirect('/');    
                }
                return res.render('users/login', {categories});
             
            }
        })
    },
        

/* //antes de conectar bbdd

        let userToLogin = usersTable.findByField('email',req.body.email);
        if(userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(isOkThePassword){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if(req.body.remember_user){
                    res.cookie('userEmail',req.body.email,{maxAge:(1000*60)*60})
                }
            }
            return res.render('users/login', {categories});
        }
    },
*/
    
    myOrders:(req,res)=> {
        db.Users.findAll()
        .then ((resultados) =>{
            console.log(resultados);
            res.send('Hola estoy en cuenta. Definir vista de mis pedidos.');
        })

    }
}