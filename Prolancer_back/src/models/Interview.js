const connectDb = require('../common/connectdb.js');

var Interview = function (Interview) {
    this.InterviewID = Interview.InterviewID;
    this.CreateByID = Interview.CreateByID;
    this.ScheduledDate = Interview.ScheduledDate;
    this.Location = Interview.Location
    this.Description = Interview.Description;
    this.Status = Interview.Status;

};


Interview.getAllInterviewsWithPaging = function (status, limit, offset, interview, pagination) {
    var sql = "Select i.*, f.First_Name, f.Last_Name, f.Profile_Picture, f.Location AS 'freelancerAddress', f.Description as FreelancerDescription from Interview i INNER JOIN Freelancer f ON i.CreateByID = f.FreelancerID WHERE";
    var sqlCount = "Select COUNT(*) AS count from Interview WHERE";
    
    console.log("sql: ", sql);
    console.log("sqlCount: ", sqlCount);
  
    var check = connectDb.query(sql + " i.Status = ? LIMIT ? OFFSET ?", [status, limit, offset], function (err, res) {
      if (err) {
        console.log("error: ", err);
        interview(err,null)
      }
      else {
  
        interview(null,res);
      }
    });
  
    connectDb.query(sqlCount + " Status = ?", [status], function (err, res) {
      if (err) {
  
        pagination(err,null);
      }
      else {
        pagination(null,res);
      }
    });
  
    
  }



Interview.getAllFreelancerInterviewsWithPaging = function (freelancerId, status, limit, offset, interview, pagination) {
    var sql = "Select i.*, f.First_Name, f.Last_Name, f.Profile_Picture, f.Location AS 'freelancerAddress', f.Description as FreelancerDescription from Interview i INNER JOIN Freelancer f ON i.CreateByID = f.FreelancerID WHERE";
    var sqlCount = "Select COUNT(*) AS count from Interview WHERE";
    console.log("sql: ", sql);
    console.log("sqlCount: ", sqlCount);
  
    var check = connectDb.query(sql + " i.CreateByID = ? AND i.Status = ? LIMIT ? OFFSET ?", [freelancerId, status, limit, offset], function (err, res) {
      if (err) {
        console.log("error: ", err);
        interview(err,null)
      }
      else {
  
        interview(null,res);
      }
    });
  
    connectDb.query(sqlCount + " CreateByID = ? AND Status = ?", [freelancerId, status], function (err, res) {
      if (err) {
  
        pagination(err,null);
      }
      else {
        pagination(null,res);
      }
    });
  
    
  }

  Interview.updateInterviewStatus = function(status, id, result){
    connectDb.query("UPDATE Interview SET Status = ? WHERE InterviewID = ?", [status, id], function(err, res){
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    })  
  }

  Interview.createInterview = function(data, result){
    connectDb.query("INSERT INTO Interview SET ?", [data], function(err, res){
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    }) 
  }

  Interview.updateInterviewInfo = function(date, location, id, result){
    connectDb.query("UPDATE Interview SET ScheduledDate = ?, Location = ? WHERE InterviewID = ?", [date, location, id], function(err, res){
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    }) 
  }

module.exports = Interview;