import mysql from "mysql2"

//Create the connection to database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"prolancer"
})

export default db;