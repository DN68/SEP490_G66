const connectDb = require('../common/connectdb.js');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const Freelancer = require('../models/Freelancer.js');


class FreelancerController {


    getFreelancerInfo = function (req, res) {
        let token = req.headers.token;
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                // res.redirect('/login')
                return res.status(401).json({
                    title: 'unauthorized'
                })
            }
            const accountID = decoded.accountID
            console.log(accountID)
            Freelancer.getFreelancerInfo(accountID, function (err, results) {
                if (err) {
                    return console.log(err)
                }
                console.log(results)
                return res.status(200).json({
                    title: 'Freelancer grabbed',
                    //can add more fields
                    // freelancer: {
                    //     FreelancerID: results[0].FreelancerID,
                    //     AccountID: results[0].AccountID,
                    //     First_Name: results[0].First_Name,
                    //     Last_Name: results[0].Last_Name,
                    //     Profile_Picture: results[0].Profile_Picture,
                    //     Location: results[0].Location,
                    //     Phoneno: results[0].Phoneno,
                    //     Description: results[0].Description,
                    //     MainCategoryID: results[0].MainCategoryID
                    // }
                    freelancer: results[0]
                })
            })
        })

    }



    updateFreelancerInfo = function (req, res) {
        const freelancer = req.body;
        const accountID = req.params.accountID
        Freelancer.updateFreelancerInfo(freelancer, accountID, function (err, results) {
            if (err) {
                return console.log(err)
            }
            // console.log(results)
            return res.status(200).json({
                title: 'changed Successfully'
            })
        })
    }


    getfreelancersByStatusAndPaging = function (req, res) {
        const limit = 16;
        var pageQuery = req.query;
        var page;
        var search
        var status = pageQuery.status;
        // console.log(status)
        if (pageQuery.search != null) {

            search = pageQuery.search;

            console.log('Search here ' + search);

        } else {
            search = '';
        }
        console.log(search);

        if (pageQuery.page != null && pageQuery.page > 0) {
            page = pageQuery.page;
        } else {
            page = 1;
        }
        console.log("page:" + page);

        const offset = (page - 1) * limit;
        console.log(offset);
        let freelancer, totalRows;

        // Create a Promise to handle the asynchronous operation
        const fetchData = new Promise((resolve, reject) => {
            console.log(status)
            Freelancer.getAllFreelancersWithPaging(status, search, limit, offset, function (err, freelancerData) {
                console.log(freelancerData)
                if (err) {
                    reject(err);
                } else {
                    freelancer = freelancerData;
                    if (totalRows !== undefined) {
                        resolve();
                    }

                }
            }, function (err, totalRowsData) {
                if (err) {
                    reject(err);
                } else {
                    totalRows = totalRowsData;
                    if (freelancer !== undefined) {

                        resolve();
                    }
                }
            });
        });

        fetchData.then(() => {
            // Both callbacks have been called, so you can send the response now.
            res.send({
                freelancer, pagination: {
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

    freelancerRegister = function (req, res) {
        const accountID = req.body.accountID;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const profilePicture = req.body.profilePicture;
        const location = req.body.location;
        const description = req.body.description;
        const phoneNo = req.body.phoneNo;
        const mainCategoryID = req.body.mainCategoryID

        createFreelancer();

        //Create freelancer
        function createFreelancer() {
            Freelancer.createFreelancer(accountID, firstName, lastName, profilePicture, location, description, phoneNo, mainCategoryID, function (err, result) {
                if (err) {
                    res.send(err);
                }
                console.log(result)
                if (result) {
                    Freelancer.getFreelancerByAccountID(accountID, function (err, results) {
                        if (err) {
                            return console.log(err)
                        }
                        console.log(results[0])
                        if (results[0]) {
                            return res.status(200).json({
                                freelancer: results[0]
                            })
                        }
                    })
                }
            })
        }
    }

    getAvatarImage = function (req, res) {
        var imgName = req.params.imgName;

        const imgPath = path.join(__dirname, '..', '..', 'uploads', 'images', 'avatar', imgName);
        res.sendFile(imgPath);
    }
}
module.exports = new FreelancerController;