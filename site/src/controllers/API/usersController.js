const db = require('../../database/models');
module.exports = {
    //localhost/api/user/:email
    details: (req,res) =>{
        userEmail = req.params.email;
        db.Users.findOne({ where: { email: userEmail }})
                .then ( (userDetails) => {
                    if(userDetails) {
                        delete userDetails.dataValues.password;
                        res.status(200).json({
                            data: userDetails,
                            status:200,
                        })
                    } else {
                        res.status(400).json({
                            data: null,
                            status:400,
                        })
                    }
                })
    },
    //localhost/api/user/
    showAll: (req,res) =>{
        db.Users.findAll()
                .then ( (usersDetails) => {
                    let newArray = [];
                    usersDetails.forEach(element =>{
                        let newElement = {};
                        newElement.id = element.dataValues.id;
                        newElement.name = element.dataValues.name;
                        newElement.email = element.dataValues.email;
                        newElement.detail = "https://localhost:300/api/user/"+element.dataValues.email;
                        newArray.push(newElement);
                    })
                    res.status(200).json({
                        count: newArray.length,
                        users: newArray,
                        status:200,
                    })
                })
    }

};