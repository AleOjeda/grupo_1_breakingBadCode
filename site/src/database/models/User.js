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
    return User;
}