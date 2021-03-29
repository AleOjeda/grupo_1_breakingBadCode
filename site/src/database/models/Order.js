module.exports = (sequelize, dataTypes) => {
    let alias ="Orders"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: dataTypes.INTEGER
        },
        status:{
            type: dataTypes.TEXT
        },
        required_date:{
            type: dataTypes.DATE
        },
        shipped_date:{
            type: dataTypes.DATE
        },
        comments:{
            type: dataTypes.TEXT
        },
        tracking_number:{
            type: dataTypes.INTEGER
        },
        shipping_address:{
            type: dataTypes.TEXT
        },
        total:{
            type: dataTypes.INTEGER
        },
        userOrder:{
            type: dataTypes.INTEGER
        },
    };
    let config = {
        tableName : "orders",
        timestamps : false //columnas created at & updated at
    }   
    const Order = sequelize.define(alias,columns,config);

    Order.associate = (models) =>{
        Order.hasMany(models.Payments,{
              as: "payments",
              foreignKey: "order_id"
        });
        Order.belongsTo(models.Users,{
            as: "user",
            foreignKey: "user_id"
        });
        Order.hasMany(models.Orders_products,{
            as: "order_products",
            foreignKey: "order_id"
        });

    }


    return Order;
}