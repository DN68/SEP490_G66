const connectDb = require('../common/connectdb.js');

var User = function (user) {
    this.UserID = user.UserID
    this.Username = user.Username
    this.Email = user.Email
    this.Password = user.Password
    this.First_Name = user.First_Name
    this.Last_Name = user.Last_Name
    this.Profile_Picture = user.Profile_Picture
    this.Location = user.Location
    this.Status = user.Status
    this.Role = user.Role
    this.fid = user.fid
    this.Phoneno = user.Phoneno
    this.Description = user.Description
};

User.createUser = function (email, username, password, result) {
    connectDb.query("INSERT INTO User SET Email = ?, Username = ?, Password = ?, Role = 'C'", 
    [email, username, password], function (err, res) {
        if (err) {
            result(null, err);
        }
        else {
            result(null,res);
        }
    })
}

User.getUserByEmail = function(email, results){
    connectDb.query("SELECT * FROM User WHERE Email = ?", 
    [email], function(err, res){
        if (err) {
            results(null,err);
        }
        else {
            results(null,res);
        }
    })
}


User.getUserByEmailOrUsername = function(emailOrUsername, results){
    connectDb.query("SELECT * FROM User WHERE Email = ? OR Username = ?", 
    [emailOrUsername, emailOrUsername], function(err, res){
        if (err) {
            results(null,err);
        }
        else {
            results(null,res);
        }
    })
}

User.updateUserInfo = function(data, email, results){
    connectDb.query("UPDATE User SET ? WHERE Email = ?",
        [data, email], (err, res) => {
            if (err) {
                results(null,err);
            }
            else {
                results(null,res);
            }
        })
}

User.updateUserPassword = function(newPassword, email, results){
    connectDb.query("UPDATE User SET Password = ? WHERE Email = ?",
        [newPassword, email], (err, res) => {
            if (err) {
                results(null,err);
            }
            else {
                results(null,res);
            }
        })
}



module.exports= User;




