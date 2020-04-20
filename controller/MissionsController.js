const Mission = require('../models/mongoose/mission');
const Status = require('../models/mongoose/status');

exports.getAll = (req, res, next) => {
    Mission.find(function (err, missions){
        res.send(missions);
    }).populate(['status']);
}

exports.create = (req, res, next) => {
    var new_mission = new Mission({
        name: req.body.name,
        description: req.body.description,
        maxPrice: req.body.maxPrice,
        zip:  req.body.zip,
        address:  req.body.address,
        locationX: 0,
        locationY: 0,
        creatorId:  req.body.creatorId,
        helperId: null,
        paymentMethodId:  req.body.paymentMethodId,
        status:  req.body.stat,
        karmaPoints: null,
        categoryId: req.body.categoryId,
        paymentStatus:  req.body.paymentStatus,
        isReviewed: true,
        checkList: null,
        receipts: null
    });
    new_mission.save(function(err, new_mission){
        if(!err){
            res.send(new_mission);
        }
    });
}