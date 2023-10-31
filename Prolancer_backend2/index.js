const express = require("express");
const mysql = require("mysql");
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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

//mysql session config
var sessionConnection = mysql.createConnection(options);
var sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,
    //temp table for storing session data
    schema: {
        tableName: 'sessiontbl',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data',
        }
    }
}, sessionConnection)

//session info
app.use(session({
    // key: 'keyIn',
    secret: 'my secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))


// //login (with fake data)
// app.use('/login', function(req, res){
//     const {username, password} = req.body
//     if(username != userData.username || password != userData.password){
//         return res.status(401).json({
//             error: true,
//             message: "Username or Password is invalid"
//         })
//     }else{
//         // assign value to session named userInfo
//         req.session.userInfo = userData.fullname
//         res.send("Landing success!")
//     }
// })


// //logout(with fake data)
// app.use('/logout', function(req, res){
//     req.session.destroy(function(err){
//         if(!err){
//             res.send("Log out!")
//         }
//     })
// })


// //check logged in (with fake data)
// app.use('/', function(req, res){
//     if(req.session.userInfo){
//         res.send("Hello " + req.session.userInfo + " Welcome")
//     }else{
//         res.send("Not Logged in")
//     }
// })

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
            let token = jwt.sign({ email: results[0].email }, 'secretkey');
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
    const data = req.body;
    db.query("UPDATE Users SET password = ? WHERE email = ?",
        [data.password, email], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
})


//Update user profile
app.put('/user/:email/profile/update', function (req, res) {
    const { email } = req.params;
    const data = req.body;
    db.query("UPDATE Users SET email= ?, username = ?, password = ? WHERE email = ?",
        [data.email, data.username, data.password, email], (err, results) => {
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
        if (err){
            return res.status(401).json({
                title: 'unauthorized'
            })
        } 
        const email = decoded.email
        console.log(email)
        db.query("SELECT * FROM Users WHERE email = ?",
            [email], (err, results) => {
                if (err) {
                    return console.log(err)
                }
                return res.status(200).json({
                    title: 'user grabbed',
                    user: {
                        email: results[0].email,
                        username: results[0].username
                    }
                })
            })
    })

})


//get gig list
app.get('/gigs', function (req, res) {
    db.query("SELECT * FROM Gigs", (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
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


