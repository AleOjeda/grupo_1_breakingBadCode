const fs = require('fs');
const path = require('path');
function categories (req, res,next) {
     res.locals.categories= fs.readFileSync(path.resolve(__dirname,"../database/categories.json"
    ),{encoding:"utf-8"}) 
    next();
}

module.exports = categories;