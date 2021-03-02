function authMiddleware(req,res,next) {
    if(!req.session.userLogged){
        return res.redirect('/usuario/login');
    }
    next();
}

module.exports = authMiddleware;