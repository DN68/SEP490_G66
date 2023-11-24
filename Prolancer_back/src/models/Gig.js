const connectDb = require('../common/connectdb.js');

var Gig = function (gig) {
  this.gigId = gig.GigID;
  this.title = gig.Title;
  this.description = gig.Description;
  this.gigImg = gig.Gig_IMG;
  this.categoryId = gig.CategoryID;
  this.price = gig.Price;
  this.deliveryDay = gig.Delivery_Day;
  this.freelancerId = gig.FreelancerID;
  this.creationDate = gig.Creation_Date;
  this.status = gig.Status;
};

Gig.getAll = function (result) {
  connectDb.query("Select * from Gig", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('gig : ', res);
      result(null, res);
    }
  });
};

Gig.getGigWithFilterAndPagingAndSearching = function (status, filterByCategory, filterByDeliveryDay, filterByPrice, search, limit, offset, gig, pagination) {
  var sql = "Select g.*, f.First_Name, f.Last_Name, f.Profile_Picture, f.Location, f.Description as FreelancerDescription, c.Category_Name from Gig g INNER JOIN Freelancer f ON g.FreelancerID = f.FreelancerID INNER JOIN Category c ON g.CategoryID = c.CategoryID WHERE";
  var sqlCount = "Select COUNT(*) AS count from Gig WHERE";

  if (filterByDeliveryDay != '') {
    sql = sql + " g.Delivery_Day <= " + filterByDeliveryDay + " AND";
    sqlCount = sqlCount + " Delivery_Day <= " + filterByDeliveryDay + " AND";

    console.log("run Delivery_Day")
  }
  if (filterByPrice != '') {
    sql = sql + " g.Price <= " + filterByPrice + " AND";
    sqlCount = sqlCount + " Price <= " + filterByPrice + " AND";
    console.log("run Price")


  }
  console.log("sql: ", sql);
  console.log("sqlCount: ", sqlCount);


  var check = connectDb.query(sql + " g.Status = ? AND g.CategoryID LIKE ? AND g.Title LIKE ? LIMIT ? OFFSET ?", [status,'%' + filterByCategory + '%', '%' + search + '%', limit, offset], function (err, res) {
    if (err) {
      console.log("error: ", err);
      gig(err,null)
    }
    else {

      gig(null,res);
    }
  });

  connectDb.query(sqlCount + " Status = ? AND CategoryID LIKE ? AND Title LIKE ?", [status, '%' + filterByCategory + '%', '%' + search + '%'], function (err, res) {
    if (err) {

      pagination(err,null);
    }
    else {
      pagination(null,res);
    }
  });
};

Gig.getFreelancerGigWithPagingAndSearching = function (status, freelancerId, search, limit, offset, gig, pagination) {
  var sql = "Select g.*, f.First_Name, f.Last_Name, f.Profile_Picture, f.Location, f.Description as FreelancerDescription, c.Category_Name from Gig g INNER JOIN Freelancer f ON g.FreelancerID = f.FreelancerID INNER JOIN Category c ON g.CategoryID = c.CategoryID WHERE";
  var sqlCount = "Select COUNT(*) AS count from Gig WHERE";

  if(freelancerId != ''){
    sql = sql + " g.FreelancerID = " + freelancerId + " AND";
    sqlCount = sqlCount + " FreelancerID = " + freelancerId + " AND";
  }
  
  console.log("sql: ", sql);
  console.log("sqlCount: ", sqlCount);

  var check = connectDb.query(sql + " g.Status = ? AND g.Title LIKE ? LIMIT ? OFFSET ?", [status, '%' + search + '%', limit, offset], function (err, res) {
    if (err) {
      console.log("error: ", err);
      gig(err,null)
    }
    else {

      gig(null,res);
    }
  });

  connectDb.query(sqlCount + " Status = ? AND Title LIKE ?", [status, '%' + search + '%'], function (err, res) {
    if (err) {

      pagination(err,null);
    }
    else {
      pagination(null,res);
    }
  });

  
};

Gig.getGigById = function (id, result) {
  connectDb.query("Select g.* from Gig g Where g.GigID = ?", [id], function (err, res) {
    if (err) {
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};

Gig.getGigByFreelancerId = function (id,status,results) {
  connectDb.query("Select g.*, c.Category_Name from Gig g INNER JOIN Category c ON g.CategoryID = c.CategoryID INNER JOIN Freelancer f ON g.FreelancerID = f.FreelancerID INNER JOIN User u ON u.UserID = f.UserID Where f.UserID = ? AND g.Status = ?", [id, status], function (err, res) {
    if (err) {
      results(null, err);
    }
    else {
      results(null, res);
    }
  });
};

Gig.createGig = function (Title, Description, Gig_IMG, Price, Delivery_Day, FreelancerID, CategoryID, Numberpage, result) {
  connectDb.query("INSERT INTO Gig SET Title = ?, Description = ?, Gig_IMG = ?, Price = ?, Delivery_Day = ?, FreelancerID = ?, CategoryID = ?, Numberpage = ?, Creation_Date = CURDATE(), Status = 'Active'",
    [Title, Description, Gig_IMG, Price, Delivery_Day, FreelancerID, CategoryID, Numberpage], function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    })
}


Gig.updateGig = function(data, id, result){
  connectDb.query("UPDATE Gig SET ? WHERE GigID = ?", [data, id], function(err, res){
    if (err) {
      result(null, err);
    }
    else {
      result(null, res);
    }
  })  
}


Gig.updateGigStatus = function(status, id, result){
  connectDb.query("UPDATE Gig SET Status = ? WHERE GigID = ?", [status, id], function(err, res){
    if (err) {
      result(err, null);
    }
    else {
      result(null, res);
    }
  })  
}

module.exports = Gig;