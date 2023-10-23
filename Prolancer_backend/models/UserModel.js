import db from "../config/database.js";

//get all users
export const getUsers = (result) => {
    db.query("SELECT * FROM Users"), (err, results) => {
        if (err) {
            console.log(err);
            result(err, null)
        } else {
            result(null, results);
        }
    }
}


//get single user by email & password
export const getUserByEmailPassword = (email, password, result) => {
    db.query("SELEECT * FROM Users WHERE email = ? AND password = ?",
        [email], [password], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results[0]);
            }
        })
}

// Add new user
export const insertUser = (data, result) => {
    db.query("INSERT INTO Users SET ?" , [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}