const db = require('../../database/models');
module.exports = {
    //api/category/:category
    details: (req,res) =>{
        userEmail = req.params.email;
        db.Users.findOne({ where: { email: userEmail }})
                .then ( (userDetails) => {
                    if(userDetails) {
                        res.status(200).json({
                            data: userDetails,
                            status:200,
                        })
                    } else {
                        res.status(200).json({
                            data: null,
                            status:400,
                        })
                    }
                })
    }
};