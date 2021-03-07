module.exports = (sequelize, dataTypes) => {
    let alias ="Frequent_products"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        user_id:{
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
               
    };
    let config = {
        tableName : "frequent_products",
        timestamps : false //columnas created at & updated at
    }   
    const Frequent_product = sequelize.define(alias,columns,config);

    Frequent_product.associate = (models) =>{
        Frequent_product.belongsTo(models.Products,{
            as: "product",
            foreignKey: "product_id"
        });
        Frequent_product.belongsTo(models.Users,{
            as: "user",
            foreignKey: "user_id"
        });
    }

    return Frequent_product;
}