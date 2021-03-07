const db = require('../database/models');
const jsonTable = require('../database/jsonTable');
const usersTable = jsonTable('users');

function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false;
    //Si, tiene un email registrado en el cookies, ejecuta el if, si no, else y next().
    if(req.cookies.userEmail) {
        let emailInCookie = req.cookies.userEmail;
        db.Users.findOne({
            where: {
                email: emailInCookie
            }
        })
        .then (userFromCookie =>{
            if(userFromCookie.length != 0){
                req.session.userLogged = userFromCookie;
            };
            if(req.session.userLogged){
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }
            next()
        })
    } else {
        next()
    }
//next()
}

module.exports = userLoggedMiddleware;

/* db.Users.findOne({
    where: {
        email: req.body.email
    }
})
.then */


// antes de tocar algo
/* 
const db = require('../database/models');
const jsonTable = require('../database/jsonTable');
const usersTable = jsonTable('users');

function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = usersTable.findByField('email', emailInCookie);

    if(userFromCookie){
            req.session.userLogged = userFromCookie;
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();

    //Preguntar porque uso dos If si podria haber sido solo 1.
}

module.exports = userLoggedMiddleware; */