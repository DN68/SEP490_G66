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
}
module.exports = new CustomerController;