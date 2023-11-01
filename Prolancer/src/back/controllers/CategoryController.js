const connectDb = require('../common/connectdb.js');
class CategoryController {


    getCategory(req, res) {
        let query = 'SELECT * FROM Category';
        connectDb.query(query,function(err,rows){
        
        if(err) {console.log(err);}
        else{
        res.json(rows);
        
        }


        });
   
    }

    index (req,res){
              console.log( 'success');
                res.send('New Detail');
      
    }

}
module.exports = new CategoryController;