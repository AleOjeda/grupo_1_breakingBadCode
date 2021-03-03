const categories = require('../database/categories');
const bcryptjs = require('bcryptjs');
const db = require('../models');

const jsonTable = require('../database/jsonTable');
const usersTable = jsonTable('users');
module.exports = {

    index: (req,res) => {
        res.send('Hola estoy en cuenta. Definir vista index cuenta');
    },
    register:(req,res) => {
        res.render('users/registro',{categories});
    },
    processRegister:(req,res) => {
        let userInDB = usersTable.findByField('email',req.body.email);
        if(userInDB) {
            return res.send ('Este email ya esta registrado')
        } 
        let userToCreate ={
            ...req.body,
            password: bcryptjs.hashSync(req.body.password,10),
        }
        let userCreated= usersTable.create(userToCreate);
        res.redirect('./login')
    },
    login: (req,res) => {
        res.render('users/login', {categories});
    },
    processLogin: (req,res) =>{
        
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
        
        
        
        
        
        
        
        /* let usersJSON = usersTable.readFile();
        let users;
        if(usersJSON == "") {
            users= [];
        } else {
            users = usersJSON;
        };
   
        let usuarioALoguearse = undefined;
        for ( let i = 0; i< users.length; i++){
            if (users[i].email == req.body.email){
                if(req.body.password == users[i].password){
                    let usuarioALoguearse = users[i];
                    console.log('Usuario logueado :',usuarioALoguearse);
                    return res.render('users/login', {categories});
                    break;
                }
            }
        };

        if(usuarioALoguearse == undefined) {
            console.log('Usuario no logueado',req.body);
            return res.render('users/login', {categories});
        }; */
    },
    myOrders:(req,res)=> {
        db.Users.findAll()
        .then ((resultados) =>{
            console.log(resultados);
            res.send('Hola estoy en cuenta. Definir vista de mis pedidos.');
        })

    }
}