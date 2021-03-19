module.exports = (sequelize, dataTypes) => {
    let alias ="Shopping_cart_items"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        user_id:{
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        product_id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        quantity:{
            type: dataTypes.INTEGER
        },
               
    };
    let config = {
        tableName : "Shopping_cart_items",
        timestamps : false //columnas created at & updated at
    }   
    const Shopping_cart_item = sequelize.define(alias,columns,config);

    Shopping_cart_item.associate = (models) =>{
        Shopping_cart_item.belongsTo(models.Users,{
            as: "user",
            foreignKey: "user_id"
        });
        Shopping_cart_item.belongsTo(models.Products,{
            as: "product",
            foreignKey: "product_id"
        });
    }

    return Shopping_cart_item;
}