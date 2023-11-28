const connectDb = require('../common/connectdb.js');

var Account = function (account) {
    this.AccountID = account.AccountID
    this.Username = account.Username
    this.Email = account.Email
    this.Password = account.Password
    this.Status = account.Status
    this.Role = account.Role
    this.fid = account.fid
};

Account.createAccount = function (email, username, password, role, result) {
    connectDb.query("INSERT INTO Account SET Email = ?, Username = ?, Password = ?, Role = ?, Status = 'Pending'",
        [email, username, password, role], function (err, res) {
            if (err) {
                result(null, err);
            }
            else {
                result(null, res);
            }
        })
}

Account.getAccountByEmail = function (email, results) {
    connectDb.query("SELECT * FROM Account WHERE Email = ?",
        [email], function (err, res) {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}
Account.getAccountByUsername = function (username, results) {
    connectDb.query("SELECT * FROM Account WHERE Username = ?",
        [username], function (err, res) {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}


Account.getAccountByEmailOrUsername = function (emailOrUsername, results) {
    connectDb.query("SELECT * FROM Account WHERE Email = ? OR Username = ?",
        [emailOrUsername, emailOrUsername], function (err, res) {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}

// Account.updateUserInfo = function (data, email, results) {
//     connectDb.query("UPDATE Account SET ? WHERE Email = ?",
//         [data, email], (err, res) => {
//             if (err) {
//                 results(null, err);
//             }
//             else {
//                 results(null, res);
//             }
//         })
// }

Account.updateAccountPassword = function (newPassword, email, results) {
    connectDb.query("UPDATE Account SET Password = ? WHERE Email = ?",
        [newPassword, email], (err, res) => {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}


// Account.changeFreelancerRole = function (role, email, results) {
//     connectDb.query("UPDATE Account SET Role = ? WHERE Email = ? AND isFreelancer = 1", [role, email], (err, res) => {
//         if (err) {
//             results(null, err);
//         }
//         else {
//             results(null, res);
//         }
//     })
// }

Account.getAllAccountsWithPaging = function (status, limit, offset, account, pagination) {
    var sql = "Select * from Account WHERE";
    var sqlCount = "Select COUNT(*) AS count from Account WHERE";

    console.log("sql: ", sql);
    console.log("sqlCount: ", sqlCount);

    var check = connectDb.query(sql + " Role != 'A' AND Status = ? LIMIT ? OFFSET ?", [status, limit, offset], function (err, res) {
        if (err) {
            console.log("error: ", err);
            account(err, null)
        }
        else {

            account(null, res);
        }
    });

    connectDb.query(sqlCount + " Role != 'A' AND Status = ?", [status], function (err, res) {
        if (err) {

            pagination(err, null);
        }
        else {
            pagination(null, res);
        }
    });


}


Account.updateAccountStatus = function (status, id, result) {
    connectDb.query("UPDATE Account SET Status = ? WHERE AccountID = ?", [status, id], function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    })
}

module.exports = Account;




