const products = require('../database/products');
const categories = require('../database/categories');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const {validationResult} = require('express-validator');

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
        let errors = validationResult(req);
        db.Users.findOne({ where: { email: req.body.email }})
            .then (userInDb =>{
                if(userInDb) {
                    return res.render ('users/registro', {errors:{email: { msg:'Este email ya esta registrado'}},
                                                            categories})
                }
                // Pregunto si hay errores, si los hay, los devuelvo.
                if (!errors.isEmpty()){
                    return res.render('users/registro', {
                        errors: errors.mapped(),
                        old: req.body,
                        categories
                    })
                }
                db.Users.create({
                    name: req.body.fullName,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password,10)
                })
                .then (() => res.redirect('login'))
            })
    },

    login: (req,res) => {
        res.render('users/login', {categories});
    },
    processLogin: (req,res) =>{
        let errors = validationResult(req);

        db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then (userInDB => {

            if(userInDB == null) {
                // la variable que viene de validationResult es un objeto que tiene una key errors, donde ahí se muestran los errores
                errors.errors.push({
                    value: req.body.email,
                    msg: "La cuenta o la contraseña es incorrecta.",
                    param: 'email',
                    location: 'body'
                })}
            // pregunto si es distinto de null (tabla vacia) o si lo que devuelve es un array vacio (no encontró el usuario)
            if(userInDB !== null) {
                let isOkThePassword = bcryptjs.compareSync(req.body.password, userInDB.password);
                if(isOkThePassword){
                    delete userInDB.password;
                    req.session.userLogged = userInDB;
                    //ver que pasaria con session si no pondriamos esa cookie. Ahora la cookie estaria. Middleware de si no tiene session, eliminar la cookie.
                    res.cookie('userId',userInDB.id,{maxAge:(1000*60)*30});
                    
                    if(req.body.remember_user){
                        res.cookie('userEmail',req.body.email,{maxAge:(1000*60)*30}) //(60*1000)*60*24 son 24 horas //(60*1000)=1 minuto;
                    };
                    return res.redirect('/');    
                }
                errors.errors.push({
                    value: req.body.password,
                    msg: "La cuenta o la contraseña es incorrecta.",
                    param: 'password',
                    location: 'body'
                })
                //return res.render('users/login', {categories});
            }
            if (!errors.isEmpty()){
                return res.render('users/login', {
                    errors: errors.mapped(),
                    old: req.body,
                    categories
                })
            }
        })
    },

    logout: (req,res) => {
            res.clearCookie('userEmail');
            res.clearCookie('userId');
            req.session.destroy();
            return res.redirect('/');
        },
    
    myOrders:(req,res)=> {
        let userID = {};
        if(res.locals.userLogged){
            userID = res.locals.userLogged.id
        } 
        db.Orders.findAll({
                /* include: [{
                        association: "order",
                        where: {
                            id : userId,}},
                    {association:"product"}
                ], */
                where: {
                    user_id : userID
                }
            })
        .then ((orders) =>{
            return res.render('orders/myOrders', {orders, categories});;
        })

    },
    userEdit:(req,res)=>{
        db.Users.findOne({
            where: {id:req.params.id}
        })
        .then((user) => {
            res.render('users/userEdit',{user});
        })
    },
    update: (req,res) => {
        db.Users.update({
            name: req.body.name ,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
        },
        {
            where: {id: req.params.id}
        }).then(()=> res.redirect('/usuario/'+req.params.id))
        .catch( (err)=> console.log(err))
    },

    create:(req,res)=>{
        res.render('users/userCreate');
    },
    createPost: (req,res) => {
        db.Users.create({
            name: req.body.name ,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password,10),
            address: req.body.address,
            phone: req.body.phone,
        },
        {
            where: {id: req.params.id}
        }).then(()=> res.redirect('login'))
        .catch( (err)=> console.log(err))
    },


    userDetails:(req,res)=>{
        db.Users.findOne({
            where: {id:req.params.id}
        })
        .then((user) => {
            return res.render('users/userDetail', {user})
        })
    }
}