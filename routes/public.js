var express = require("express");
var router = express.Router();

// Controller
const usersController = require("../controller/UsersController");

router.route("/login").post(usersController.login);
router.route("/signup").post(usersController.signup);

module.exports = router;
