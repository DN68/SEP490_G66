const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis')
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//Create random string
const generateRandomString = (myLength) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};
// console.log(generateRandomString(10))

class AccountController {

    //Create new Account
    accountRegister = function (req, res) {
        const email = req.body.email;
        const username = req.body.username;
        const role = req.body.role;
        const password = bcrypt.hashSync(req.body.password, 10);
        Account.createAccount(email, username, password, role, function (err, result) {
            if (err) {
                res.send(err);
            }
            if(result){
                Account.getAccountByEmail(email, function(err, results){
                    if (err) {
                        return console.log(err)
                    }
                    // console.log(results[0])
                    if (results[0]) {
                        return res.status(200).json({
                            account: results[0]
                        })
                    }
                })
            }
        })
    }


    login = function (req, res) {
        const emailOrUsername = req.body.emailOrUsername
        Account.getAccountByEmailOrUsername(emailOrUsername, function (err, results) {
            console.log(results)
            if (err) {
                return res.status(500).json({
                    title: 'server error',
                    error: err
                })
            }
            if (!results[0]) {
                return res.status(401).json({
                    title: 'Account not found',
                    error: 'invalid credentials'
                })
            }
            if (!bcrypt.compareSync(req.body.password, results[0].Password)) {
                return res.status(401).json({
                    title: 'login failed',
                    error: 'invalid credentials'
                })
            }

            //IF ALL IS GOOD create a token and send to frontend
            let token = jwt.sign({ accountID: results[0].AccountID, email: results[0].Email, role: results[0].Role }, 'secretkey', { expiresIn: 43200 });
            // console.log(token)
            if (results[0].Status != 'Active' && results[0].Status != 'Pending') {
                return res.status(201).json({
                    title: 'access denied',
                    status: results[0].Status
                })
            }
            return res.status(200).json({
                title: 'login sucess',
                token: token
            })

        })
    }


    changePassword = function (req, res) {
        const email = req.params.email;
        const inputOldPassword = req.body.inputOldPassword;
        const oldPassword = req.body.oldPassword;
        const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
        console.log(oldPassword)
        if (!bcrypt.compareSync(inputOldPassword, oldPassword)) {
            return res.status(401).json({
                title: 'change pass failed',
                error: 'wrong password'
            })
        }
        Account.updateAccountPassword(newPassword, email, function (err, results) {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
    }


    forgotPassword = function (req, res) {
        const email = req.body.email;
        Account.getAccountByEmail(email, function (err, results) {
            if (err) {
                return console.log(err)
            }
            // console.log(results[0])
            if (!results[0]) {
                return res.status(401).json({
                    title: 'error',
                    error: 'no user with this email'
                })
            }
            //Send new random password to email
            const newPassword = generateRandomString(10)
            const encodedNewPassword = bcrypt.hashSync(newPassword, 10)
            Account.updateAccountPassword(encodedNewPassword, email, function (err, results) {
                if (!results) {
                    res.send(err);
                }
            })
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
                subject: "Forgot password", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>This is your new password: " + newPassword + "</b>", // html body
            });
            return res.status(200).json({
                title: 'success',
                message: 'Sent password to mail'
            })
            // console.log(info)
        })
    }


    getAccountInfo = function (req, res) {
        let token = req.headers.token;
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                // res.redirect('/login')
                return res.status(401).json({
                    title: 'unauthorized'
                })
            }
            const email = decoded.email
            Account.getAccountByEmail(email, function (err, results) {
                if (err) {
                    return console.log(err)
                }
                return res.status(200).json({
                    title: 'Account grabbed',
                    //can add more fields
                    account: results[0]
                })
            })
        })

    }

    confirmCreateACcount = function (req, res) {
        const email = req.body.email;
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

        const account = req.body
        console.log(account)
        const encodedAccountData = encodeURIComponent(JSON.stringify(account));
        let verificationCode = generateRandomString(6);
        // if (account.role == 'C') {
        //     redirectLink = `http://localhost:8080/register-company?data=${encodedAccountData}`
        // } else if (account.role == 'F') {
        //     redirectLink = `http://localhost:8080/becomesel?data=${encodedAccountData}`
        // }

        const info = transport.sendMail({
            from: '"Prolancer" <anpqhe160968@fpt.edu.vn>', // sender address
            to: "" + email + "", // list of receivers
            subject: "Verify your email:", // Subject line
            text: "Hello world?", // plain text body
            // html: "<b>Please verify your email: <a href='" + redirectLink + "'>Verify email</a></b>", // html body
            html: "<b>This is your verification code:" + verificationCode + "</b>", // html body
        });
        return res.status(200).json({
            title: 'success',
            message: 'Sent verification code to mail',
            code: verificationCode
        })
        // console.log(info)
    }


    checkMailExist = function (req, res) {
        const email = req.params.email;
        Account.getAccountByEmail(email, function (err, results) {
            if (err) {
                return console.log(err)
            }
            if (!results[0]) {
                return res.status(200).send(false)
            }
            return res.status(200).send(true)

        })
    }

    checkUsernameExist = function (req, res) {
        const username = req.params.username;
        Account.getAccountByUsername(username, function (err, results) {
            if (err) {
                return console.log(err)
            }
            if (!results[0]) {
                return res.status(200).send(false)
            }
            return res.status(200).send(true)

        })
    }


    getAccountsByStatusAndPaging = function (req, res) {
        const limit = 16;
        var pageQuery = req.query;
        var page;
        var status = pageQuery.status;

        // if (pageQuery.search != null) {

        //   search = pageQuery.search;

        //   console.log('Search here ' + search);

        // } else {
        //   search = '';
        // }
        // console.log(search);

        if (pageQuery.page != null) {
            page = pageQuery.page;
        } else {
            page = 1;
        }
        console.log(page);

        const offset = (page - 1) * limit;
        console.log(offset);
        let account, totalRows;

        // Create a Promise to handle the asynchronous operation
        const fetchData = new Promise((resolve, reject) => {
            Account.getAllAccountsWithPaging(status, limit, offset, function (err, accountData) {
                console.log(accountData)
                if (err) {
                    reject(err);
                } else {
                    account = accountData;
                    if (totalRows !== undefined) {
                        resolve();
                    }

                }
            }, function (err, totalRowsData) {
                if (err) {
                    reject(err);
                } else {
                    totalRows = totalRowsData;
                    if (account !== undefined) {

                        resolve();
                    }
                }
            });
        });

        fetchData.then(() => {
            // Both callbacks have been called, so you can send the response now.
            res.send({
                account, pagination: {
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

    changeAccountStatus = function (req, res) {
        const data = req.body;
        var status = data.status;
        var accountID = data.accountID;

        console.log(status + accountID);

        Account.updateAccountStatus(status, accountID, function (err, result) {
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



module.exports = new AccountController;   