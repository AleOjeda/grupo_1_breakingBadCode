module.exports = (sequelize, dataTypes) => {
    let alias ="Users"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email:{
            type: dataTypes.STRING
        },
        name:{
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        }        
    };
    let config = {
        tableName : "users",
        timestamps : false //columnas created at & updated at
    }
        
    const User = sequelize.define(alias,columns,config);


    return User;


}