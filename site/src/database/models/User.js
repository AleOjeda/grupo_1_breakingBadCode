module.exports = (sequelize, dataTypes) => {
    let alias ="Users"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        address:{
            type: dataTypes.STRING
        },
        phone:{
            type: dataTypes.STRING
        },
        other_comments:{
            type: dataTypes.STRING
        },       
    };
    let config = {
        tableName : "users",
        timestamps : false //columnas created at & updated at
    }   
    const User = sequelize.define(alias,columns,config);

    User.associate = (models) =>{
        User.hasMany(models.Payments,{
              as: "payments",
              foreignKey: "user_id"
        });
        User.hasMany(models.Orders,{
            as: "orders",
            foreignKey: "user_id"
        });
        User.hasMany(models.Frequent_products,{
            as: "frequent_products",
            foreignKey: "user_id"
        });
        User.hasMany(models.Shopping_cart_items,{
            as: "Shopping_cart_items",
            foreignKey: "user_id"
        });
    }

    return User;
}