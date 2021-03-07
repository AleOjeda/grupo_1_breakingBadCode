module.exports = (sequelize, dataTypes) => {
    let alias ="Payments"; //Es el alias que usamos en los controladores db.Users
    let columns = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: dataTypes.INTEGER
        },
        order_id:{
            type: dataTypes.INTEGER
        },
        payment_date:{
            type: dataTypes.DATE
        },
        amount:{
            type: dataTypes.INTEGER
        },
        comments:{
            type: dataTypes.STRING
        },  
               
    };
    let config = {
        tableName : "payments",
        timestamps : false //columnas created at & updated at
    }   
    const Payment = sequelize.define(alias,columns,config);

    Payment.associate = (models) =>{
        Payment.belongsTo(models.Users,{
              as: "user",
              foreignKey: "user_id"
        });
        Payment.belongsTo(models.Orders,{
            as: "order",
            foreignKey: "order_id"
        });

    }

    return Payment;
}