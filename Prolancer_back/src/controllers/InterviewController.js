const connectDb = require('../common/connectdb.js');
const Interview = require('../models/Interview.js');
class InterviewController {


    getInterviewsByStatusAndPaging = function (req, res) {
        const limit = 16;
        var pageQuery = req.query;
        // console.log("🚀 ~ file: GigController.js:9 ~ GigController ~ pageQuery:", pageQuery)
        var page;
        var status = pageQuery.status;

        // if (pageQuery.search != null) {

        //   search = pageQuery.search;

        //   console.log('Search here ' + search);

        // } else {
        //   search = '';
        // }
        // console.log(search);

        if (pageQuery.page != null && pageQuery.page > 0) {
            page = pageQuery.page;
        } else {
            page = 1;
        }
        console.log(page);

        const offset = (page - 1) * limit;
        console.log(offset);
        let interview, totalRows;

        // Create a Promise to handle the asynchronous operation
        const fetchData = new Promise((resolve, reject) => {
            Interview.getAllInterviewsWithPaging(status, limit, offset, function (err, interviewData) {
                console.log(interviewData)
                if (err) {
                    reject(err);
                } else {
                    interview = interviewData;
                    if (totalRows !== undefined) {
                        resolve();
                    }

                }
            }, function (err, totalRowsData) {
                if (err) {
                    reject(err);
                } else {
                    totalRows = totalRowsData;
                    if (interview !== undefined) {

                        resolve();
                    }
                }
            });
        });

        fetchData.then(() => {
            // Both callbacks have been called, so you can send the response now.
            res.send({
                interview, pagination: {
                    totalPage: Math.ceil(totalRows[0].count / limit),
                    page: parseInt(page),
                    totalRow: totalRows[0].count
                }, searchQuery: {
                    //   search: search,
                    status: status,
                }
            });
        }, (err) => {
            res.send(err);
        }
        ).catch(error => {
            console.error(error);
            res.status(500).send("An error occurred");
        });
    };


    changeInterviewStatus = function (req, res) {
        const data = req.body;
        var status = data.status;
        var interviewID = data.interviewID;
        // console.log(status + interviewID);
    
        Interview.updateInterviewStatus(status, interviewID, function (err, result) {
          if (err)
            return res.send(err);
          else {
            console.log('res', result);
            if (result.affectedRows == 0) {
              res.send({ message: 'Change Status Failed' });
    
            }
            res.send({ message: 'Change Status Success' });
          }
    
        });
      }
}
module.exports = new InterviewController;