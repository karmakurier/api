const models = require('../models/sequelize');
const Status = require('../models/mongoose/status');
exports.getAll = (req, res, next) => {
    Status.find((err, statuses) => {
        res.send(statuses);
    });
}

exports.getById = (req, res, next) => {
    Status.findByID(eq.params.id, (err, status)=> {
        res.send(status);
    });
}
