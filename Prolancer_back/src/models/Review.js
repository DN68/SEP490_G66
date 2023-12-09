const connectDb = require('../common/connectdb.js');

var Review = function (review) {
  this.ReviewID = review.ReviewID;
  this.ReviewerID = review.ReviewerID;
  this.ReceiverID = review.ReceiverID;
  this.Rating_Score = review.Rating_Score;
  this.Comment = review.Comment;
  this.Review_Date = review.Review_Date;
  this.Status = review.Status;

};
Review.createReview = function (review, result) {
    const currentDate = require('moment')().format('YYYY-MM-DD HH:mm:ss');

    connectDb.query("INSERT INTO `Review` (`ReviewID`, `ReviewerID`, `ReceiverID`, `Rating_Score`, `Comment`, `Review_Date`, `OrderID`) VALUES (NULL, ?, ?, ?, ?, ?, ?)", [review.ReviewerID, review.ReceiverID, review.Rating_Score, review.Comment, currentDate, review.OrderID], function (err, res) {
      if (err) {
  
        result(err, null);
      }
      else {
  
        result(null,res);
      }
    });
  };


  Review.getReviewByOrderId = function (id, result) {
    connectDb.query("SELECT r.*, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture, c.CompanyName FROM `Review` r INNER JOIN Customer c ON r.ReviewerID = c.CustomerID INNER JOIN Freelancer f ON r.ReceiverID = f.FreelancerID WHERE OrderID = ?", [id], function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  };
  
module.exports = Review;