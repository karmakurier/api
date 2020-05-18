const Mission = require('../models/mongoose/mission');
const Status = require('../models/mongoose/status');
const express = require("express");
const authHelper = require('../helper/authenticationHelper');
const statusController = require('../controller/StatusController');
const router = express.Router();

module.exports = (passport) => {
    // get all missions
    router.get('/', authHelper.isAuthenticatedUser, statusController.getAll);
    // get a single mission by id
    router.get('/:id', authHelper.isAuthenticatedUser, statusController.getById);

    return router;
}





