const connectDb = require('../common/connectdb.js');

var Category = function(category){
    this.CategoryID     = category.OrderID;
    this.CategoryName      = category.CustomerID;
    this.Description     = category.Description;
    this.Status = category.Status;

  };


  Category.getAllCategory = function (result) {
    let query = 'SELECT * FROM Category';
    connectDb.query(query,function(err,res){

     if(err) {
            result(err,null);
          }
          else{
            result(null,res);
          }



    });

}
module.exports= Category;