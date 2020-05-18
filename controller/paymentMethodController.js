const models = require('../models/sequelize');
const PaymentMethod = require('../models/mongoose/paymentMethod');
exports.getAll = (req, res, next) => {
    PaymentMethod.find((err, paymentMethods) => {
        res.send(paymentMethods);
    });
}

exports.getById = (req, res, next) => {
    PaymentMethod.findByID(eq.params.id, (err, PaymentMethod)=> {
        res.send(paymentMethods);
    });
}