const db = require('../../database/models');

module.exports = {
    ///  http://localhost:3000/api/cart/
    show : (req, res) =>{
        db.Shopping_cart_items
            .findAll({
                include: [{association: "user"}],
                include: [{association: "product"}],
                where:{ user_id: req.cookies.userId},
            })
            .then ((shopping_cart) => {
                let products = shopping_cart;
                
                let totalAmount = 0;
                products.forEach(item => {
                    item.dataValues.subtotal = item.dataValues.quantity * item.dataValues.product.price;
                    //Formateo total $$
                    item.dataValues.subtotal = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(item.dataValues.subtotal);
                    item.dataValues.subtotal = item.dataValues.subtotal.replace("CLP","$");
                    item.dataValues.subtotal = item.dataValues.subtotal.replace(",",".");
                    //Le quito el espacio... se trata de un "no breaking space, por eso se usa \u00a0 y no " " 
                    item.dataValues.subtotal = item.dataValues.subtotal.replace("\u00a0","");
                    //Calculo Total
                    totalAmount = totalAmount + item.dataValues.subtotal;
                });
                
                //Formateo total $$
                totalAmount = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(totalAmount);
                totalAmount = totalAmount.replace("CLP","$");
                totalAmount = totalAmount.replace(",",".");
                //Le quito el espacio... se trata de un "no breaking space, por eso se usa \u00a0 y no " " 
                totalAmount = totalAmount.replace("\u00a0","");

                res.status(200).json({
                    "totalSku": products.length,
                    "usuario": req.body.user,
                    "totalAmountCart": totalAmount,
                    "data": products,
                    "status": 200
                });
            })
            .catch(err => console.log(err));
    },

    ///  http://localhost:3000/api/cart/:item/:operation     operacion= add / subtract / create / remove 
    addSubtractRemoveQuantity : (req, res) =>{
 
// hasta el final
        //Agarra el SKU, y lo busca en el carrito actual, si no esta, lo pushea, si esta, le agrega +1. 
        let sku = req.params.item;
        let operation = req.params.operation;
        let user = req.cookies.userId;
        switch (operation){
            case 'create':
                db.Shopping_cart_items
                .create({
                    user_id: user,
                    product_id: sku,
                    quantity: 1
                })
                .catch();
                break;
            case 'add':
                db.Shopping_cart_items
                .findOne({
                    where:{ user_id: user, product_id: sku},
                })
                .then( response => {
                    db.Shopping_cart_items
                    .update({
                        quantity: response.quantity + 1,
                    },{
                        where:{
                            user_id: user, product_id: sku
                        }
                    })
                })
                .catch()
                break;
            case 'subtract':
                db.Shopping_cart_items
                .findOne({
                    where:{ user_id: user, product_id: sku},
                })
                .then( response => {
                    if (response.quantity>1){
                        db.Shopping_cart_items
                        .update({
                            quantity: response.quantity - 1,
                        },{
                            where:{
                                user_id: user, product_id: sku
                            }
                        })
                        .catch();
                    } else {
                        db.Shopping_cart_items
                        .destroy({
                             where:{
                                user_id: user, product_id: sku
                            }
                        })
                        .catch();
                    }
                });
                break;
            case 'remove':
                db.Shopping_cart_items
                .destroy({
                    where:{
                        user_id: user, product_id: sku
                    }
                })
                .catch();
                break;
        }
        return res.status(200).json({
                        data: 'item Ok',
                        status:200,
            });
    },

};