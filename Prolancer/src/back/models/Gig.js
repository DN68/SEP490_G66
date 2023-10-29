const connectDb = require('../common/connectdb.js');

var Gig = function(gig){
    this.gigId     = gig.gigId;
    this.title      = gig.title;
    this.description          = gig.description;
    this.gigImg          = gig.gigImg;
    this.categoryId   = gig.categoryId;
    this.price    = gig.price;
    this.deliveryDay = gig.deliveryDay;
    this.freelancerId     = gig.freelancerId;
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
            // result(null, err);
          }
          else{
            // console.log("gig: ", res);

            gig(res);
          }
      });
      // console.log("error: ", check);

      connectDb.query(sqlCount+" CategoryID LIKE ? AND Title LIKE ?", ['%'+filterByCategory+'%','%'+search+'%'], function (err, res) {
        if(err) {
          
          pagination(err);
        }
        else{
          pagination(res);
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