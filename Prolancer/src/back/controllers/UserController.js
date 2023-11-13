const User = require('../models/User');
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

class UserController {

    //Create new user
    register = function (req, res) {
        const email = req.body.email;
        const username = req.body.username;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phoneNo = req.body.phoneNo;
        const password = bcrypt.hashSync(req.body.password, 10);
        User.createUser(email, username, firstName, lastName, phoneNo, password, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }


    login = function (req, res) {
        const emailOrUsername = req.body.emailOrUsername
        User.getUserByEmailOrUsername(emailOrUsername, function (err, results) {
            console.log(results)
            if (err) {
                return res.status(500).json({
                    title: 'server error',
                    error: err
                })
            }
            if (!results[0]) {
                return res.status(401).json({
                    title: 'user not found',
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
            let token = jwt.sign({ email: results[0].Email, role: results[0].Role }, 'secretkey', { expiresIn: 43200 });
            // console.log(token)
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

        if (!bcrypt.compareSync(inputOldPassword, oldPassword)) {
            return res.status(401).json({
                title: 'change pass failed',
                error: 'wrong password'
            })
        }
        User.updateUserPassword(newPassword, email, function (err, results) {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
    }


    forgotPassword = function (req, res) {
        const email = req.body.email;
        User.getUserByEmail(email, function (err, results) {
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
            User.updateUserPassword(encodedNewPassword, email, function (err, results) {
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


    getUserInfo = function (req, res) {
        let token = req.headers.token;
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                // res.redirect('/login')
                return res.status(401).json({
                    title: 'unauthorized'
                })
            }
            const email = decoded.email
            User.getUserByEmail(email, function (err, results) {
                if (err) {
                    return console.log(err)
                }
                return res.status(200).json({
                    title: 'user grabbed',
                    //can add more fields
                    user: {
                        userId: results[0].UserID,
                        email: results[0].Email,
                        username: results[0].Username,
                        firstName: results[0].First_Name,
                        lastName: results[0].Last_Name,
                        phone: results[0].Phoneno,
                        description: results[0].Description,
                        image: results[0].Profile_Picture,
                        password: results[0].Password,
                        role: results[0].Role,
                        location: results[0].Location,
                        fid: results[0].Status,
                        isFreelancer: results[0].isFreelancer,
                        id: results[0].UserID
                    }
                })
            })
        })

    }


    checkMailExist = function (req, res) {
        const email = req.params.email;
        User.getUserByEmail(email, function (err, results) {
            if (err) {
                return console.log(err)
            }
            if(!results[0]){
                return res.status(200).send(false)
            }
            return res.status(200).send(true)

        })
    }

    checkUsernameExist = function (req, res) {
        const username = req.params.username;
        User.getUserByUsername(username, function (err, results) {
            if (err) {
                return console.log(err)
            }
            if(!results[0]){
                return res.status(200).send(false)
            }
            return res.status(200).send(true)

        })
    }

    updateProfile = function (req, res) {
        const email = req.params.email;
        const data = req.body;
        console.log(data)
        User.updateUserInfo(data, email, function (err, results) {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
    }

    changeFreelancerMode = function (req, res) {
        const email = req.body.email
        const role = req.body.role
        User.changeFreelancerRole(role, email, function (err, results) {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
    }
}

module.exports = new UserController;   