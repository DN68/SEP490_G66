const connectDb = require('../common/connectdb.js');
const Category = require('../models/Category.js');
class CategoryController {


    getAllCategory = function (req, res) {
        Category.getAllCategory(function (err, categories) {
            if (err) { res.send(err); }
            else {
                res.json(categories);
            }
        });
    }
}
module.exports = new CategoryController;