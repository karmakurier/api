const Mission = require('../models/mongoose/mission');
const Status = require('../models/mongoose/status');

exports.getAll = (req, res, next) => {
    Mission.find(function (err, missions) {
        res.send(missions);
    }).populate(['status']);
}

exports.getById = (req, res, next) => {
    Mission.findById(req.params.id, function (err, mission) {
        res.send(mission);
    }).populate(['status']);
}

exports.update = (req, res, next) => {
    Mission.findById(req.params.id, function (err, mission) {

        // only allow update, when the user is creator or supporter.
        if (!err && (mission.creatorId == req.user.id || mission.supporterId == req.user.id)) {
            mission.name = req.body.name;
            mission.description = req.body.description;
            mission.maxPrice = req.body.maxPrice;
            mission.zip = req.body.zip;
            mission.address = req.body.address;
            mission.locationX = req.body.locationX;
            mission.locationY = req.body.locationY;
            // dont allow changing the creator or the helper, if he is already assigned
            // mission.creatorId = req.body.creatorId;
            // mission.helperId = req.body.helperId;
            mission.paymentMethodId = req.body.paymentMethodId;
            mission.status = req.body.status;
            mission.karmaPoints = req.body.karmaPoints;
            mission.categoryId = req.body.categoryId;
            mission.paymentStatus = req.body.paymentStatus;
            mission.isReviewed = req.body.isReviewed;
            mission.checkList = req.body.checkList;
            mission.receipts = req.body.receipts;

            mission.update(function (err, new_mission) {
                if (!err) {
                    res.send(new_mission);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.status(403).send({message: 'User is not allowed to edit this mission.'});
        }
    });
}

exports.delete = (req, res, next) => {
    Mission.findByIdAndRemove(req.params.id, (err, res) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Mission successfully deleted",
            id: res._id
        };
        return res.status(200).send(response);
    })
}

/**
 * Updates the helperId of a given mission
 */
exports.assign = (req, res, next) => {
    Mission.findById(req.params.id, (err, mission) => {
        let new_helper = req.body.helperId;
        if (!mission.helperId) {
            mission.helperId = new_helper;

            mission.update(function (err, new_mission) {
                if (!err) {
                    res.send(new_mission);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.status(403).send({ message: "Mission is already assigned to a user." })
        }
    });
}

exports.updateStatus = (req, res, next) => {
    let user = req.user;
    let new_status = req.body.statusId;

    Mission.findById(req.params.id, (err, mission) => {
        

        if (mission.helperId) {
            mission.helperId = new_helper;

            mission.update(function (err, new_mission) {
                if (!err) {
                    res.send(new_mission);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.status(403).send({ message: "Mission is already assigned to a user." })
        }
    });
}

exports.create = (req, res, next) => {
    var new_mission = new Mission({
        name: req.body.name,
        description: req.body.description,
        maxPrice: req.body.maxPrice,
        zip: req.body.zip,
        address: req.body.address,
        locationX: 0,
        locationY: 0,
        creatorId: req.body.creatorId,
        supporterId: req.user.id,
        helperId: null,
        paymentMethodId: req.body.paymentMethodId,
        status: req.body.stat,
        karmaPoints: null,
        categoryId: req.body.categoryId,
        paymentStatus: req.body.paymentStatus,
        isReviewed: true,
        checkList: null,
        receipts: null
    });
    new_mission.save(function (err, new_mission) {
        if (!err) {
            res.send(new_mission);
        }
    });
}