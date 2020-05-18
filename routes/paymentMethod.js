const Mission = require('../models/mongoose/mission');
const Status = require('../models/mongoose/status');
const express = require("express");
const authHelper = require('../helper/authenticationHelper');
const paymentMethodController = require('../controller/paymentMethodController');
const router = express.Router();

module.exports = (passport) => {
    // get all payment Methods
    router.get('/', authHelper.isAuthenticatedUser, paymentMethodController.getAll);
    // get a single payment Method by id
    router.get('/:id', authHelper.isAuthenticatedUser, paymentMethodController.getById);

    return router;
}





