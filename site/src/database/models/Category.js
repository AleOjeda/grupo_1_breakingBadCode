module.exports = (sequelize, dataTypes) => {
    let alias ="Categories"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category:{
            type: dataTypes.TEXT
        },
               
    };
    let config = {
        tableName : "categories",
        timestamps : false //columnas created at & updated at
    }   
    const Category = sequelize.define(alias,columns,config);

    Category.associate = (models) =>{
        Category.hasMany(models.Products,{
              as: "products",
              foreignKey: "category_id"
        });
        Category.hasMany(models.Sub_categories,{
            as: "sub_categories",
            foreignKey: "category_id"
      });
    }

    return Category;
}