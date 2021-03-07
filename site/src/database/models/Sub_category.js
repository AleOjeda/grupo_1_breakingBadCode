module.exports = (sequelize, dataTypes) => {
    let alias ="Sub_categories"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_id:{
            type: dataTypes.INTEGER
        },
        sub_category:{
            type: dataTypes.TEXT
        },
               
    };
    let config = {
        tableName : "sub_categories",
        timestamps : false //columnas created at & updated at
    }   
    const Sub_category = sequelize.define(alias,columns,config);

    Sub_category.associate = (models) =>{
        Sub_category.hasMany(models.Products,{
              as: "products",
              foreignKey: "sub_category_id"
        });
        Sub_category.belongsTo(models.Categories,{
            as: "category",
            foreignKey: "category_id"
        });
    }

    return Sub_category;
}