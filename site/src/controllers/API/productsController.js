const db = require('../../database/models');
module.exports = {
    //localhost/api/products/
    showAll: (req,res) =>{
        db.Products.findAll({
            include: [{association: "category"}],
        })
        .then (products =>{
            let categoriesProducts= {};
            products.forEach(element => {
                let comparacion = (categoriesProducts[element.dataValues.category.category] == undefined) 
                if(comparacion){
                    categoriesProducts[element.dataValues.category.category] = 1;
                } else{
                    categoriesProducts[element.dataValues.category.category] ++;
                }
            });
            let newArray= [];
            products.forEach(element =>{
                let newElement = {};
                newElement.id = element.dataValues.id;
                newElement.name = element.dataValues.brand;
                newElement.description = element.dataValues.description;
                newElement.categories = new Array(element.dataValues.category);
                newElement.detail = "http://localhost:300/api/product/"+element.dataValues.id;
                newArray.push(newElement);
            })
            res.status(200).json({
                status:200,
                countByCategory: categoriesProducts,
                totalData: products.length,
                data: newArray
            })
        })
    },
    showOne: (req,res) =>{
        db.Products.findOne({ where: { id: req.params.id },
            include: [
                {association: "category"},
                //{association: "frequent_products"},
                {association: "orders_product"},
                {association: "shopping_cart_items"},
                      ]
        }
        )
        .then (product => {
            console.log(product);
            product.dataValues.image = "http://localhost:3000"+product.dataValues.image;
            res.status(200).json({
                status:200,
                totalData: product.length,
                data: product.dataValues
            })
        })
    },
};