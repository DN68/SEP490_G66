const connectDb = require('../common/connectdb.js');
const jwt = require('jsonwebtoken');
const Freelancer = require('../models/Freelancer.js');
class FreelancerController {


    getFreelancerInfo = function (req, res) {
        let token = req.headers.token;
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                // res.redirect('/login')
                return res.status(401).json({
                    title: 'unauthorized'
                })
            }
            const accountID = decoded.accountID
            // console.log(accountID)
            Freelancer.getFreelancerInfo(accountID, function (err, results) {
                if (err) {
                    return console.log(err)
                }
                console.log(results)
                return res.status(200).json({
                    title: 'Freelancer grabbed',
                    //can add more fields
                    // freelancer: {
                    //     FreelancerID: results[0].FreelancerID,
                    //     AccountID: results[0].AccountID,
                    //     First_Name: results[0].First_Name,
                    //     Last_Name: results[0].Last_Name,
                    //     Profile_Picture: results[0].Profile_Picture,
                    //     Location: results[0].Location,
                    //     Phoneno: results[0].Phoneno,
                    //     Description: results[0].Description,
                    //     MainCategoryID: results[0].MainCategoryID
                    // }
                    freelancer: results[0]
                })
            })
        })

    }



    updateFreelancerInfo = function (req, res) {
        const freelancer = req.body;
        const accountID = req.params.accountID
        Freelancer.updateFreelancerInfo(freelancer, accountID, function (err, results) {
            if (err) {
                return console.log(err)
            }
            // console.log(results)
            return res.status(200).json({
                title: 'changed Successfully'
            })
        })
    }
}
module.exports = new FreelancerController;