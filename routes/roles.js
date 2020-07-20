const models = require('../models/sequelize');
const rolesController = require('../controller/RolesController');
const authHelper = require('../helper/authenticationHelper');
const express = require("express");
const router = express.Router();

// READ all
router.get('/', authHelper.isAuthenticatedUser, rolesController.getAll);

// CREATE single
router.post('/', authHelper.isAuthenticatedAdmin, rolesController.create);

// READ Single
router.get('/:id', authHelper.isAuthenticatedUser,  rolesController.getById);

// UPDATE single
router.put('/:id', authHelper.isAuthenticatedAdmin, rolesController.update);

// DELETE single
router.delete('/:id', authHelper.isAuthenticatedAdmin,  rolesController.delete);

module.exports = router;