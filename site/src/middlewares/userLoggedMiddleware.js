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

module.exports = userLoggedMiddleware;