const connectDb = require('../common/connectdb.js');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer.js');
const { firebase } = require('googleapis/build/src/apis/firebase/index.js');
class CustomerController {


    getCustomerInfo = function (req, res) {
        let token = req.headers.token;
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                // res.redirect('/login')
                return res.status(401).json({
                    title: 'unauthorized'
                })
            }
            const accountID = decoded.accountID
            // console.log(accountID)
            Customer.getCustomerInfo(accountID, function (err, results) {
                if (err) {
                    return console.log(err)
                }
                // console.log(results)
                return res.status(200).json({
                    title: 'Freelancer grabbed',
                    //can add more fields
                    customer: results[0]
                    // customer: {
                    //     CustomerID: results[0].CustomerID,
                    //     AccountID: results[0].AccountID,
                    //     First_Name: results[0].First_Name,
                    //     Last_Name: results[0].Last_Name,
                    //     Profile_Picture: results[0].Profile_Picture,
                    //     Location: results[0].Location,
                    //     Phoneno: results[0].Phoneno,
                    //     CompanyName: results[0].CompanyName,
                    //     TaxCode: results[0].TaxCode,
                    //     CompanyAddress: results[0].CompanyAddress,
                    // }
                })
            })
        })

    }


    updateCustomerInfo = function (req, res) {
        const customer = req.body;
        console.log(customer)
        const accountID = req.params.accountID
        Customer.updateCustomerInfo(customer, accountID, function (err, results) {
            if (err) {
                return console.log(err)
            }
            // console.log(results)
            return res.status(200).json({
                title: 'changed Successfully'
            })
        })
    }

    customerRegister = function (req, res) {
        const accountID = req.body.accountID;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const profilePicture = req.body.profilePicture;
        const location = req.body.location;
        const phoneNo = req.body.phoneNo;
        const companyName = req.body.companyName;
        const companyAddress = req.body.companyAddress;
        const taxCode = req.body.taxCode

        console.log(accountID)
        Customer.createCustomer(accountID, firstName, lastName, profilePicture, location, phoneNo, companyName, companyAddress, taxCode, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }


    getCustomersByStatusAndPaging = function (req, res) {
        const limit = 16;
        var pageQuery = req.query;
        var page;
        var search
        var status = pageQuery.status;

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
        console.log(page);

        const offset = (page - 1) * limit;
        console.log(offset);
        let customer, totalRows;

        // Create a Promise to handle the asynchronous operation
        const fetchData = new Promise((resolve, reject) => {
            Customer.getAllCustomersWithPaging(status, search, limit, offset, function (err, customerData) {
                console.log(customerData)
                if (err) {
                    reject(err);
                } else {
                    customer = customerData;
                    if (totalRows !== undefined) {
                        resolve();
                    }

                }
            }, function (err, totalRowsData) {
                if (err) {
                    reject(err);
                } else {
                    totalRows = totalRowsData;
                    if (customer !== undefined) {

                        resolve();
                    }
                }
            });
        });

        fetchData.then(() => {
            // Both callbacks have been called, so you can send the response now.
            res.send({
                customer, pagination: {
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
}
module.exports = new CustomerController;