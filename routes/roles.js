const models = require('../models/sequelize');
const rolesController = require('../controller/RolesController');
const express = require("express");
const router = express.Router();

// READ all
router.get('/', rolesController.getAll);

// CREATE single
router.post('/', rolesController.create);

// READ Single
router.get('/:id', rolesController.getById);

// UPDATE single
router.put('/:id', rolesController.update);

// DELETE single
router.delete('/:id', rolesController.delete);

module.exports = router;