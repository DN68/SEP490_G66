const connectDb = require('../common/connectdb.js');
const Interview = require('../models/Interview.js');
const Freelancer = require('../models/Freelancer.js');

const { google } = require('googleapis')
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

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
        // console.log(offset);
        let interview, totalRows;

        // Create a Promise to handle the asynchronous operation
        const fetchData = new Promise((resolve, reject) => {
            Interview.getAllInterviewsWithPaging(status, limit, offset, function (err, interviewData) {
                // console.log(interviewData)
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


    getFreelancerInterviewsByStatusAndPaging = function (req, res) {
        const limit = 16;
        var freelancerId = req.params.freelancerId;
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
        // console.log(offset);
        let interview, totalRows;
        // Create a Promise to handle the asynchronous operation
        const fetchData = new Promise((resolve, reject) => {
            Interview.getAllFreelancerInterviewsWithPaging(freelancerId, status, limit, offset, function (err, interviewData) {
                
                if (err) {
                    reject(err);
                } else {
                    console.log(interviewData)
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
                // console.log('res', result);
                if (result.affectedRows == 0) {
                    res.send({ message: 'Change Status Failed' });

                }
                res.send({ message: 'Change Status Success' });
            }

        });
    }

    createInterview = function (req, res) {
        const interview = req.body
        Interview.createInterview(interview, function (err, result) {
            if (err) {
                return res.status(400).send({ message: 'Interview create failed' })
            } else {
                return res.status(200).send({ message: 'Interview created successfully' })
            }
        })
    }


    changeInterviewInfo = function (req, res) {
        const date = req.body.date;
        const location = req.body.location;
        const id = req.body.id;
        Interview.updateInterviewInfo(date, location, id, function (err, result) {
            if (err) {
                return res.status(400).send({ message: 'Interview updated failed' })
            } else {
                return res.status(200).send({ message: 'Interview updated successfully' })
            }
        })
    }

    sendInterviewSchedule = function (req, res) {
        const freelancerID = req.body.freelancerID
        const scheduledDate = require('moment')(req.body.scheduledDate).format('MMMM Do YYYY, h:mm:ss a')
        const location = req.body.location
        var email;
        console.log(freelancerID)
        Freelancer.getFreelancerById(freelancerID, function (err, results) {
            console.log(results[0].Email)
            if (results[0]) {
                email = results[0].Email
                const accessToken = oAuth2Client.getAccessToken();
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'anpqhe160968@fpt.edu.vn',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken
                    }
                })
                const info = transport.sendMail({
                    from: '"Prolancer" <anpqhe160968@fpt.edu.vn>', // sender address
                    to: "" + email + "", // list of receivers
                    subject: "Your interview schedule:", // Subject line
                    text: "Hello world?", // plain text body
                    // html: "<b>Please verify your email: <a href='" + redirectLink + "'>Verify email</a></b>", // html body
                    html: "<b>This is your interview schedule:</b><br>" +
                        "- Interview date: " + scheduledDate + "<br>" +
                        "- Meeting link: " + location, // html body
                });
                return res.status(200).json({
                    title: 'success',
                    message: 'Sent interview schedule to mail',
                })
            }
            return res.status(500).json({
                title: 'failed',
                message: 'Interview schedule failed to send (Freelancer not found)',
            })
        })

        // console.log(info)
    }
}
module.exports = new InterviewController;