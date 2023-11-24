const connectDb = require('../common/connectdb.js');

var CV = function (cv) {
  this.CV_ID = cv.CV_ID;
  this.FreelancerID = cv.FreelancerID;
  this.Title = cv.Title;
  this.Description = cv.Description;
  this.CV_Upload = cv.CV_Upload;
  this.Status = cv.Status;

};
CV.createCV = function (cv, result) {
    const date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    
    connectDb.query("INSERT INTO `CV` (`CV_ID`, `FreelancerID`, `Title`, `Description`, `CV_Upload`, `UploadDate`, `Status`) VALUES (NULL, ?, ?, ?, ?, ?, 'Active')", [cv.FreelancerID, cv.Title, cv.Description, cv.CV_Upload, date], function (err, res) {
      if (err) {
  
        result(err);
      }
      else {
  
        result(res);
      }
    });
  };


  CV.updateCV = function (newCV,FreelancerID, result) {
    connectDb.query("UPDATE `CV` SET `CV_Upload` = ? WHERE `CV`.`FreelancerID` = ?", [newCV,FreelancerID], function (err, res) {
     if (err) {
  
        result(err,null);
      }
      else {
  
        result(null,res);
      }
    });
  
  };
  
module.exports = CV;