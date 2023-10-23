const connectDb = require('../common/connectdb.js');

var Gig = function(gig){
    this.gigId     = gig.id;
    this.title      = gig.last_name;
    this.description          = gig.email;
    this.gigImg          = gig.phone;
    this.categoryId   = gig.organization;
    this.price    = gig.designation;
    this.freelancerId         = gig.salary;
    this.creationDate     = new Date();
    this.status     = gig.status;
  };
  
  Gig.getAll = function (result) {
    connectDb.query("Select * from Gig", function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            console.log('gig : ', res);
            result(null, res);
          }
      });
  };

  Gig.getById = function (id,result) {
    
    connectDb.query("Select * from Gig Where GigID = ?", [id], function (err, res) {
          if(err) {
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
  };

  module.exports= Gig;