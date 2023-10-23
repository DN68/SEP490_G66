// import functions from User model
import {
    getUsers,
    getUserByEmailPassword,
    insertUser,
} from "../models/UserModel.js"

//get all users
export const showUsers = (req, res) => {
    getUsers((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}


//get user by username, password
export const showUserByEmailPassword = (req, res) => {
    getUserByEmailPassword(req.params.username, req.params.password, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}

export const createUser = (req, res) => {
    const data = req.body;
    insertUser(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}
