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

User.createUser = function (email, username, firstName, lastName, phoneNo, password, result) {
    connectDb.query("INSERT INTO User SET Email = ?, Username = ?, First_Name = ?, Last_Name = ?, Phoneno = ?, Password = ?, Role = 'C',Status = 'Pending', Profile_Picture = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'",
        [email, username, firstName, lastName, phoneNo, password], function (err, res) {
            if (err) {
                result(null, err);
            }
            else {
                result(null, res);
            }
        })
}

User.getUserByEmail = function (email, results) {
    connectDb.query("SELECT * FROM User WHERE Email = ?",
        [email], function (err, res) {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}
User.getUserByUsername = function (username, results) {
    connectDb.query("SELECT * FROM User WHERE Username = ?",
        [username], function (err, res) {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}


User.getUserByEmailOrUsername = function (emailOrUsername, results) {
    connectDb.query("SELECT * FROM User WHERE Email = ? OR Username = ?",
        [emailOrUsername, emailOrUsername], function (err, res) {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}

User.updateUserInfo = function (data, email, results) {
    connectDb.query("UPDATE User SET ? WHERE Email = ?",
        [data, email], (err, res) => {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}

User.updateUserPassword = function (newPassword, email, results) {
    connectDb.query("UPDATE User SET Password = ? WHERE Email = ?",
        [newPassword, email], (err, res) => {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}


User.changeFreelancerRole = function (role, email, results) {
    connectDb.query("UPDATE User SET Role = ? WHERE Email = ? AND isFreelancer = 1", [role, email], (err, res) => {
        if (err) {
            results(null, err);
        }
        else {
            results(null, res);
        }
    })
}


module.exports = User;




