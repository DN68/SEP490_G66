const express = require("express");
const mysql = require("mysql");
const session = require("express-session")
// const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { google } = require('googleapis')
const nodemailer = require('nodemailer')
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Send message to email
// const sendMail = async () => {
//     try {
//         const accessToken = await oAuth2Client.getAccessToken();
//         const transport = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 type: 'OAuth2',
//                 user: 'anpqhe160968@fpt.edu.vn',
//                 clientId: CLIENT_ID,
//                 clientSecret: CLIENT_SECRET,
//                 refreshToken: REFRESH_TOKEN,
//                 accessToken: accessToken
//             }
//         })
//         const info = await transport.sendMail({
//             from: '"Fred Foo 👻" <anpqhe160968@fpt.edu.vn>', // sender address
//             to: "gameseeker630@gmail.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello ajinomoto</b>", // html body
//         });

//         console.log(info)
//     } catch (error) {
//         console.error(error)
//     }
// }

// sendMail()

//create random string
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

//fake data
const userData = {
    fullname: "an",
    username: "anp",
    password: 12345
}

var app = express()


const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}

app.use(cors(corsOptions))
// app.use(cors());


//interpret json data, sql can recognize when receive json
app.use(express.json({}));
app.use(express.urlencoded(
    {
        extended: true
    }
))

//db info
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'prolancer',
}
const db = mysql.createConnection(options)

// //mysql session config
// var sessionConnection = mysql.createConnection(options);
// var sessionStore = new MySQLStore({
//     expiration: 10800000,
//     createDatabaseTable: true,
//     //temp table for storing session data
//     schema: {
//         tableName: 'sessiontbl',
//         columnNames: {
//             session_id: 'session_id',
//             expires: 'expires',
//             data: 'data',
//         }
//     }
// }, sessionConnection)


//Create user
app.post('/users/create', function (req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, 10);
    db.query("INSERT INTO Users SET email = ?, username = ?, password = ?", [email, username, password], (err, results) => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                error: 'email in use'
            })
        }
        return res.status(200).json({
            title: 'signup success'
        })
    })
})

//User login
app.post('/login', function (req, res) {
    db.query("SELECT * FROM Users WHERE email = ?",
        [req.body.email], (err, results) => {
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
            if (!bcrypt.compareSync(req.body.password, results[0].password)) {
                return res.status(401).json({
                    title: 'login failed',
                    error: 'invalid credentials'
                })
            }
            //IF ALL IS GOOD create a token and send to frontend
            let token = jwt.sign({ email: results[0].email, role: results[0].role }, 'secretkey', {expiresIn: 43200});
            // console.log(token)
            return res.status(200).json({
                title: 'login sucess',
                token: token
            })

        })
})


//Logout
app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (!err) {
            res.send("Log out!")
        }
    })
})


//Change password
app.put('/user/:email/changepw', function (req, res) {
    const { email } = req.params;
    const inputOldPassword = req.body.inputOldPassword;
    const oldPassword = req.body.oldPassword;
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10);

    // console.log(bcrypt.compareSync(inputOldPassword, oldPassword))
    if (!bcrypt.compareSync(inputOldPassword, oldPassword)) {
        return res.status(401).json({
            title: 'change pass failed',
            error: 'wrong password'
        })
    }
    db.query("UPDATE Users SET password = ? WHERE email = ?",
        [newPassword, email], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
})


// send password to specified email
app.post('/user/forgotPassword', function (req, res) {
    const email = req.body.email;
    db.query("SELECT * FROM Users WHERE email = ?",
        [email], (err, results) => {
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
            db.query("UPDATE Users SET password = ? WHERE email = ?",
                [encodedNewPassword, email], (err, results) => {
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
})


//Update user profile
app.put('/user/:email/info/update', function (req, res) {
    const { email } = req.params;
    const data = req.body;
    db.query("UPDATE Users SET ? WHERE email = ?",
        [data, email], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
})


//Get user profile
app.get('/user/info', function (req, res) {
    let token = req.headers.token;
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
            res.redirect('/login')
            return res.status(401).json({
                title: 'unauthorized'
            })
        }
        const email = decoded.email
        // const exp = decoded.exp
        // consoleDate.now()
        // console.log(exp)
        // console.log(email)
        db.query("SELECT * FROM Users WHERE email = ?",
            [email], (err, results) => {
                if (err) {
                    return console.log(err)
                }
                return res.status(200).json({
                    title: 'user grabbed',
                    //can add more fields
                    user: {
                        email: results[0].email,
                        username: results[0].username,
                        firstName: results[0].firstName,
                        lastName: results[0].lastName,
                        phone: results[0].phone,
                        description: results[0].description,
                        image: results[0].image,
                        password: results[0].password,
                        role: results[0].role
                    }
                })
            })
    })

})


//get gig list
app.get('/gigs', function (req, res) {
    db.query("SELECT * FROM Gigs", (err, results) => {
        if (err) {
            return console.log(err)
        }
        return res.status(200).json({
            title: 'gigs grabbed',
            gigs: results
        })
    })
})

//View gigs list by user id
app.get('/gigs/:userId/view', function (req, res) {
    const userId = req.params.userId
    db.query("SELECT * FROM Gigs WHERE freelancerId = ?", [userId], (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
})

//View 1 gig detail
app.get('/gigs/detail/:id', function (req, res) {
    const { id } = req.params
    db.query("SELECT * FROM Gigs WHERE id = ?",
        [id], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
})


//Create gig
app.post('/gigs/create', function (req, res) {
    const data = req.body;
    db.query("INSERT INTO Gigs SET ?", [data], (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results)
        }
    })
})


//Update gig
app.put('/gigs/:id/update', function (req, res) {
    const data = req.body;
    const id = req.params.id;
    db.query("UPDATE Gigs SET name= ?, description = ?, price = ? WHERE id = ?",
        [data.name, data.description, data.price, id], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
})

//Delete gigs
app.delete('/gigs/:id/delete', function (req, res) {
    const id = req.params.id;
    db.query("DELETE FROM Gigs WHERE id = ?",
        [id], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })

})


//Block gig
app.put('/gigs/:id/block', function (req, res) {
    const id = req.params.id;
    db.query("UPDATE Gigs SET isBlocked = 1 WHERE id = ?",
        [id], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
})

//Unblock gigs
app.put('/gigs/:id/unblock', function (req, res) {
    const id = req.params.id;
    db.query("UPDATE Gigs SET isBlocked = 0 WHERE id = ?",
        [id], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT)
})


