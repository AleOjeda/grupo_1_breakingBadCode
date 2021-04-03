const db = require('../../database/models');
module.exports = {
    show : (req, res) =>{
        //console.log(req.cookies.userId);
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
                    totalSku: products.length,
                    usuario: req.body.user,
                    totalAmountCart: totalAmount,
                    data: products,
                    status:200,
                });
            })
    },
    addSubtractQuantity : (req, res) =>{
        

        if(req.params.item != undefined && req.params.operation != undefined) {
            return res.status(200).json({
                totalSku: 'exito',
            })
        }
        return res.status(200).json({
            totalSku: 'exito1',
        })

/*


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
            console.log(totalAmount);
            //Formateo total $$
            totalAmount = Intl.NumberFormat("de-DE", {style: "currency", currency: "CLP"}).format(totalAmount);
            totalAmount = totalAmount.replace("CLP","$");
            totalAmount = totalAmount.replace(",",".");

            res.status(200).json({
                totalSku: products.length,
                usuario: req.body.user,
                totalAmountCart: totalAmount,
                data: products,
                status:200,
            });
        })*/
    },
    removeItem : (req, res) =>{
        res.render ('categories/allCategories',{categories, products});
    },
};