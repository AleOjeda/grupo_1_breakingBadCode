const db = require('../../database/models');
module.exports = {
    show : (req, res) =>{

/*         let userId = {};
        if(res.locals.userLogged){
            userId = res.locals.userLogged.id
        } 
 */
        db.Shopping_cart_items
            .findAll({
                include: [{association: "user"}],
                include: [{association: "product"}],
//                where:{ user_id: userId},
            })
            .then ((shopping_cart) => {
                let products=shopping_cart;
//                console.log(req.body.user);
                res.status(200).json({
                    total: products.length,
                    usuario: req.body.user,
                    data: products,
                    status:200,
                });
            })
    },
    addSubtractQuantity : (req, res) =>{
        res.render ('categories/allCategories',{categories, products});
    },
    removeItem : (req, res) =>{
        res.render ('categories/allCategories',{categories, products});
    },
};