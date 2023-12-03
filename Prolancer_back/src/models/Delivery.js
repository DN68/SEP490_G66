const connectDb = require('../common/connectdb.js');

var Delivery = function (delivery) {
  this.DeliveryID = delivery.DeliveryID;
  this.OrderID = delivery.OrderID;
  this.DeliveryName = delivery.DeliveryName;
  this.PlanEndDate = delivery.PlanEndDate;
  this.ActualEndDate = delivery.ActualEndDate;
  this.Note = delivery.Note;
  this.Status = delivery.Status;

};
Delivery.createDelivery = function (delivery, result) {
    const currentDate = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    const planEndDate = require('moment')(delivery.PlanEndDate).format('YYYY-MM-DD HH:mm:ss');

    connectDb.query("INSERT INTO `Delivery` (`DeliveryID`, `OrderID`, `DeliveryName`, `PlanEndDate`, `ActualEndDate`, `Note`, `Status`) VALUES (NULL, ?, ?, ?, ?, NULL, 'Delivered')", [delivery.OrderID, delivery.DeliveryName, planEndDate, currentDate], function (err, res) {
      if (err) {
  
        result(err, null);
      }
      else {
  
        result(null,res);
      }
    });
  };


  Delivery.getDeliveryByOrderId = function (id, result) {
    connectDb.query("SELECT * FROM `Delivery` WHERE OrderID = ?", [id], function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  };

  Delivery.changeDeliveryStatus = function (status,id, result) {
    connectDb.query("UPDATE `Delivery` SET `Status` = ? WHERE `Delivery`.`DeliveryID` = ?", [status,id], function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  };

  Delivery.AddDeliveryNote = function (note,id, result) {
    connectDb.query("UPDATE `Delivery` SET `Note` = ? WHERE `Delivery`.`DeliveryID` = ?", [note,id], function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  };
  
module.exports = Delivery;