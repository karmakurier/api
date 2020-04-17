const Mission = require('../models/mongoose/mission');
const Status = require('../models/mongoose/status');
const express = require("express");
const authHelper = require('../helper/authenticationHelper');
const missionController = require('../controller/MissionsController');
const router = express.Router();

module.exports = (passport) => {

    router.get('/', authHelper.isAuthenticatedUser, missionController.getAll);

    router.post('/', authHelper.isAuthenticatedUser, missionController.create);

    return router;
}





