const ChangeRequest = require('../models/ChangeRequest');
class ChangeRequestController {

    createChangeRequest = function (req, res) {
        const data = req.body;
        var changeRequest = (data.changeRequest);
        console.log(changeRequest);
        if (!changeRequest) {
          return res.status(400).send('Invalid or missing data');
        }
        if (changeRequest.requestType == "Cancel")
           changeRequest.ExtendDay = null;
        
        console.log(changeRequest);
        ChangeRequest.createChangeRequest(changeRequest, function (err, result) {
          if (err)
            res.status(500).send(err);
          else {
            res.send({ message: 'Send Request Success' });
          }
    
        })
    
      }
    getChangeRequestWithPagingAndFilter = function (req, res) {
        const limit = 6;
        var pageQuery = req.query;
        var page;
        var requestType = 'Cancel';
        var userId = '';
        var userRole = '';
        var status = '';
        var user = '';
        console.log(pageQuery);
        if (pageQuery.page != null) {
          page = pageQuery.page;
        } else {
          page = 1;
        }
        if (pageQuery.status != undefined) {
          status = pageQuery.status
          
        }
        requestType = pageQuery.requestType;
        user = pageQuery.user;
        if (!requestType||!user) {
          return res.status(400).send('Invalid or missing data');
        }
        userId = user.AccountID;
        userRole = user.Role;
        console.log(requestType, page, userId, userRole);
    
        const offset = (page - 1) * limit;
        let changeRequest, totalRows;
        const fetchData = new Promise((resolve, reject) => {
            ChangeRequest.getChangeRequestWithPagingAndFilter(userId, userRole, requestType, status, limit, offset, function (err, changeRequestData) {
            if (err) {
    
              reject(err);
            } else {
                changeRequest = changeRequestData;
              if (totalRows !== undefined) {
                resolve();
              }
            }
          }, function (err, totalRowsData) {
            if (err) {
              reject(err);
            } else {
              totalRows = totalRowsData;
              if (changeRequest !== undefined) {
                resolve();
              }
            }
          });
        });
    
        fetchData.then(() => {
          // Both callbacks have been called, so you can send the response now.
          res.send({
            changeRequest, pagination: {
              totalPage: Math.ceil(totalRows[0].count / limit),
              page: parseInt(page),
              totalRow: totalRows[0].count
            }
          });
        },
          (err) => {
            res.send(err);
          }).catch(error => {
            console.error(error);
            res.status(500).send("An error occurred");
          });
      }

      changeChangeRequestStatus = function (req, res) {
        const data = req.body;
        var status = data.status;
        var changeRequestID = data.changeRequestID;
    
        console.log(status + changeRequestID);
        if (!status||!changeRequestID) {
          return res.status(400).send('Invalid or missing data');
        }
        ChangeRequest.changeChangeRequestStatus(status, changeRequestID, function (err, result) {
          if (err)
            return res.status(500).send(err);
          else {
            if (result.affectedRows == 0) {
                return res.status(500).send({ message: 'Change Request Status Failed' });
    
            }
            res.send({ message: 'Change Request Status Success' });
          }
    
        });
    
      };
}

module.exports = new ChangeRequestController;