const express = require('express')
// const { connectToDb, getDb } = require('./db')
// const { ObjectId } = require('mongodb')

// init app & middleware
const app = express()
app.use(express.json())

let db

//db connection
// connectToDb((err) => {
//     if (!err) {
//         // port number
//         app.listen(3000, () => {
//             console.log('app listening on port 3000')
//         })
//         db = getDb()
//     }
// })


app.listen(3000, () => {
    console.log('app listening on port 3000')
})


app.get('/users', (req, res) => {
    res.json({ mssg: "welcome to the api" })
})
