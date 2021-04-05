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
                let products=shopping_cart;
                //Calculo subtotal por item
                products.map(item =>{
                    item.subtotal = item.quantity* item.product.price
                })
                //Calculo total de carrito
                let totalAmount = 0;
                products.forEach(item=>{
                    totalAmount = totalAmount + item.subtotal;
                });
                //Formateo total $$
                totalAmount = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(totalAmount);
                totalAmount = totalAmount.replace("CLP","$");
                totalAmount = totalAmount.replace(",",".");

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

// hasta el final
        //Agarra el SKU, y lo busca en el carrito actual, si no esta, lo pushea, si esta, le agrega +1. 
 /*        let sku = req.params.item;
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

}; */