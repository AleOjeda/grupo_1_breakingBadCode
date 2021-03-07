module.exports = (sequelize, dataTypes) => {
    let alias ="Orders_products"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        order_id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        product_id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        quantity:{
            type: dataTypes.INTEGER
        },
        product_unit_price:{
            type: dataTypes.TEXT
        },
               
    };
    let config = {
        tableName : "orders_products",
        timestamps : false //columnas created at & updated at
    }   
    const Order_products = sequelize.define(alias,columns,config);

    Order_products.associate = (models) =>{
        Order_products.belongsTo(models.Orders,{
            as: "order",
            foreignKey: "order_id"
        });
        Order_products.belongsTo(models.Products,{
            as: "product",
            foreignKey: "product_id"
        });
    }

    return Order_products;
}