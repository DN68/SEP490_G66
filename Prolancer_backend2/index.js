const express = require("express");
const mysql = require("mysql");
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors")

//fake data
const userData = {
    fullname: "an",
    username: "anp",
    password: 12345
}

var app = express()

app.use(cors());

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
    key: 'keyIn',
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
    const data = req.body;
    db.query("INSERT INTO Users SET ?", [data], (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
})

//User login
app.post('/login', function (req, res) {
    const data = req.body;
    db.query("SELECT * FROM Users WHERE email = ? AND password = ? LIMIT 1",
        [data.email, data.password], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                if (results) {
                    req.session.user = results;
                    // res.json(results);
                    res.json(req.session.user);
                } else {
                    res.send("Wrong email or password!");
                }
            }
        })
})


//Logout (not working)
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
app.get('/user/:email/profile', function (req, res) {
    const { email } = req.params;
    db.query("SELECT * FROM Users WHERE email = ?",
        [email], (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
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
app.get('/gigs/:userId/view', function(req, res) {
    const userId = req.params.userId
    db.query("SELECT * FROM Gigs WHERE freelancerId = ?",[userId], (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
})

//View 1 gig detail
app.get('/gigs/detail/:id', function (req, res) {
    const {id} = req.params
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
app.post('/gigs/create', function(req, res){
    const data = req.body;
    db.query("INSERT INTO Gigs SET ?", [data], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results)
        }
    })
})


//Update gig
app.put('/gigs/:id/update', function(req, res){
    const data = req.body;
    const id = req.params.id;
    db.query("UPDATE Gigs SET name= ?, description = ?, price = ? WHERE id = ?",
    [data.name, data.description, data.price, id], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }                                                      
    })
})

//Delete gigs
app.delete('/gigs/:id/delete', function(req, res){
    const id = req.params.id;
    db.query("DELETE FROM Gigs WHERE id = ?", 
    [id], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }
    })

})


//Block gig
app.put('/gigs/:id/block', function(req, res){
    const id = req.params.id;
    db.query("UPDATE Gigs SET isBlocked = 1 WHERE id = ?",
    [id], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.json(results);
        }                                                      
    })
})

//Unblock gigs
app.put('/gigs/:id/unblock', function(req, res){
    const id = req.params.id;
    db.query("UPDATE Gigs SET isBlocked = 0 WHERE id = ?",
    [id], (err, results) => {
        if(err){
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


