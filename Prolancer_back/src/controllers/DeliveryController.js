const connectDb = require('../common/connectdb.js');
const Delivery = require('../models/Delivery.js');
const Order = require('../models/Order.js');

class DeliveryController {
    createDelivery = function (req, res) {
        const data = req.body;
        var delivery = (data.Delivery)
        if (!delivery) {
            return res.status(500).send('Invalid or missing data');
        }

        Delivery.createDelivery(delivery, function (err, result) {

            if (result) {

                return res.send({ message: 'Add Product Success', insertId: result.insertId });
            }
            else {
                return res.status(500).send('Add Product Failed' + err);

            }


        })

    }

    getDeliveryByOrderId = function (req, res) {
        var id = req.query.id;

        if (!id) {
            return res.status(500).send('Invalid or missing data');
        }
        Delivery.getDeliveryByOrderId(id, function (err, delivery) {
            if (err)
                res.status(500).send(err);
            else {
                res.send(delivery.length > 0 ? { delivery } : 'Not found');

            }
        });

    };

    approveDelivery = function (req, res) {
        const data = req.body;
        var status = data.status;
        var deliverID = data.deliverID;

        console.log(status + deliverID);
        if (!status||!deliverID) {
            return res.status(500).send('Invalid or missing data');
        }
        Delivery.changeDeliveryStatus(status, deliverID, function (err, result) {
            if (err)
                return res.status(500).send(err);
            else {
                console.log('res', result);
                if (result.affectedRows == 0) {
                    return res.status(500).send({ message: 'Approve Delivery Failed' });
                } else {
                    // Call the second SQL operation after the first one is successful
                    Order.changeOrderToCompleted(function (err, result) {
                        if (err)
                            return res.status(500).send(err);
                        else {
                            // Send the final response after both operations are complete
                            return res.send({ message: 'Approve Delivery Success' });
                        }
                    });
                }
            }
        });
    };

    declineDelivery = function (req, res) {
        const data = req.body;
        var status = data.status;
        var deliverID = data.deliverID;
        var note = data.declineReason;
        if (!status||!deliverID||!note) {
            return res.status(500).send('Invalid or missing data');
        }
        Delivery.changeDeliveryStatus(status, deliverID, function (err, result) {
            if (err)
                return res.status(500).send(err);
            else {
                console.log('res', result);
                if (result.affectedRows == 0) {
                    return res.status(500).send({ message: 'Decline Delivery Failed' });
                } else {
                    // Call the second SQL operation after the first one is successful
                    Delivery.AddDeliveryNote(note,deliverID, function (err, result) {
                        if (err)
                            return res.status(500).send(err);
                        else {
                            // Send the final response after both operations are complete
                            return res.send({ message: 'Decline Delivery Success' });
                        }
                    });
                }
            }
        });
    };

    deliverAgain = function (req, res) {
        const data = req.body;
        var status = data.status;
        var deliverID = data.deliverID;
        var note = data.deliveryMessage;
        if (!status||!deliverID||!note) {
            return res.status(500).send('Invalid or missing data');
        }
        Delivery.changeDeliveryStatus(status, deliverID, function (err, result) {
            if (err)
                return res.status(500).send(err);
            else {
                console.log('res', result);
                if (result.affectedRows == 0) {
                    return res.status(500).send({ message: 'Deliver Again Failed' });
                } else {
                    // Call the second SQL operation after the first one is successful
                    Delivery.AddDeliveryNote(note,deliverID, function (err, result) {
                        if (err)
                            return res.status(500).send(err);
                        else {
                            // Send the final response after both operations are complete
                            return res.send({ message: 'Deliver Again Success' });
                        }
                    });
                }
            }
        });
    };

}
module.exports = new DeliveryController;