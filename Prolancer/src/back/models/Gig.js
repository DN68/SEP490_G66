const connectDb = require('../common/connectdb.js');

var Gig = function(gig){
    this.gigId     = gig.GigID;
    this.title      = gig.Title;
    this.description          = gig.Description;
    this.gigImg          = gig.Gig_IMG;
    this.categoryId   = gig.CategoryID;
    this.price    = gig.Price;
    this.deliveryDay = gig.Delivery_Day;
    this.freelancerId     = gig.FreelancerID;
    this.creationDate     = gig.Creation_Date;
    this.status     = gig.Status;
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

  Gig.getGigWithFilterAndPagingAndSearching = function (filterByCategory,filterByDeliveryDay,filterByPrice,search,limit,offset,gig,pagination) {
    var sql = "Select * from Gig WHERE";
    var sqlCount = "Select COUNT(*) AS count from Gig WHERE";

    if(filterByDeliveryDay!=''){
      sql = sql + " Delivery_Day <= "+filterByDeliveryDay+" AND";
      sqlCount = sqlCount + " Delivery_Day <= "+filterByDeliveryDay+" AND";

      console.log("run Delivery_Day")
      
    }
    if(filterByPrice!=''){
      sql = sql + " Price <= "+filterByPrice+" AND";
      sqlCount = sqlCount + " Price <= "+filterByPrice+" AND";
      console.log("run Price")


    }
    console.log("sql: ", sql);
    console.log("sqlCount: ", sqlCount);


    var check =connectDb.query(sql+ " CategoryID LIKE ? AND Title LIKE ? LIMIT ? OFFSET ?", ['%'+filterByCategory+'%','%'+search+'%',limit, offset], function (err, res) {
          if(err) {
            console.log("error: ", err);
          }
          else{

            gig(res);
          }
      });

      connectDb.query(sqlCount+" CategoryID LIKE ? AND Title LIKE ?", ['%'+filterByCategory+'%','%'+search+'%'], function (err, res) {
        if(err) {
          
          pagination(err);
        }
        else{
          pagination(res);
        }
    });
  };

  Gig.getGigById = function (id,result) {
    
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