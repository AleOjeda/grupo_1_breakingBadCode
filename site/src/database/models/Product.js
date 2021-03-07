module.exports = (sequelize, dataTypes) => {
    let alias ="Products"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        brand:{
            type: dataTypes.TEXT
        },
        description:{
            type: dataTypes.TEXT
        },
        display:{
            type: dataTypes.TEXT
        },
        price:{
            type: dataTypes.TEXT
        },
        discount:{
            type: dataTypes.INTEGER
        },
        other_details:{
            type: dataTypes.TEXT
        },
        category_id:{
            type: dataTypes.INTEGER
        },
        sub_category_id:{
            type: dataTypes.INTEGER
        }      
    };
    let config = {
        tableName : "products",
        timestamps : false //columnas created at & updated at
    }   
    const Product = sequelize.define(alias,columns,config);

    Product.associate = (models) =>{
        Product.hasMany(models.Orders_products,{
              as: "orders_product",
              foreignKey: "product_id"
        });
        Product.belongsTo(models.Categories,{
            as: "category",
            foreignKey: "category_id"
        });
        Product.belongsTo(models.Sub_categories,{
            as: "sub_category",
            foreignKey: "sub_category_id"
        });
        Product.hasMany(models.Frequent_products,{
            as: "frequent_products",
            foreignKey: "product_id"
        });
        Product.hasMany(models.Shopping_cart_items,{
            as: "Shopping_cart_items",
            foreignKey: "product_id"
        });
    }

    return Product;
}