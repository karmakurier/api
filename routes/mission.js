const Mission = require('../models/mongoose/mission');
const Status = require('../models/mongoose/status');
const express = require("express");
const authHelper = require('../helper/authenticationHelper');
const missionController = require('../controller/MissionsController');
const router = express.Router();

module.exports = (passport) => {
    // get all missions
    router.get('/', authHelper.isAuthenticatedUser, missionController.getAll);
    // get a single mission by id
    router.get('/:id', authHelper.isAuthenticatedUser, missionController.getById);
    // create a new mission
    router.post('/', authHelper.isAuthenticatedUser, missionController.create);
    // update an existing mission
    router.put('/:id', authHelper.isAuthenticatedAdmin, missionController.update);
    // delete an existing mission
    router.delete('/:id', authHelper.isAuthenticatedAdmin, missionController.delete);
    // assign a helper to a mission
    router.post('/:id/assign', authHelper.isAuthenticatedUser, missionController.assign);
    // assign a helper to a mission
    router.post('/:id/updateStatus', authHelper.isAuthenticatedUser, missionController.updateStatus);
    return router;
}





