const connectDb = require('../common/connectdb.js');
const Review = require('../models/Review.js');
class ReviewController {
    createReview = function (req, res) {
        const data = req.body;
        var review = (data.Review)
        if (!review) {
            return res.status(500).send('Send Review Failed');
        }

        Review.createReview(review, function (err, result) {

            if (result) {

                return res.send({ message: 'Send Review Success', insertId: result.insertId });
            }
            else {
                return res.status(500).send('Send Review Failed' + err);

            }


        })

    }

    getReviewByOrderId = function (req, res) {
        var id = req.query.id;


        Review.getReviewByOrderId(id, function (err, review) {
            if (err)
                res.status(500).send(err);
            else {
                res.send( {review});

            }
        });

    };


}
module.exports = new ReviewController;