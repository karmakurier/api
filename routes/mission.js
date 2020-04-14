var Mission = require('../models/mongoose/mission');
var Status = require('../models/mongoose/status');
var express = require("express");
var router = express.Router();




module.exports = () => {

    /*var new_artikel = new Mission({
        name: "String",
        description: "String",
        maxPrice: 1,
        zip: 1,
        address: "String",
        locationX: 12,
        locationY: 12,
        creatorId: 12,
        helperId: 12,
        paymentMethodId: 12,
        status: "5e95b1d89d55a826c0f4141b",
        karmaPoints: 1,
        categoryId: 1,
        paymentStatus: "x",
        isReviewed: true,
        checkList: null,
        receipts: null
    });
    new_artikel.save(function(err){
        console.log(err);
    });*/

    router.get('/', (req, res, next) => {

        Mission.find(function (err, missions){
            res.send(missions);
        }).populate(['status']);
    });

    return router;
}





