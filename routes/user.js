var express = require("express");
var router = express.Router();
var multer = require("multer");
var authHelper = require('../helper/authenticationHelper');

// Controller
const usersController = require("../controller/UsersController");

// Models
const models = require("../models/sequelize");

// Multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/voicemails/");
	},
	filename: function (req, file, cb) {
		let fileType = file.originalname.split(".")[
			file.originalname.split(".").length - 1
		];
		cb(null, `${req.user.data.id}-voicemail-${Date.now()}.${fileType}`);
	}
});
const uploadVoicemail = multer({ storage: storage });

// ROUTES

// Get All
router.get('/', (req, res, next) => {
	models.user.findAll().then(users => {
		res.send(users);
	})
})


router.route("/me").get(authHelper.isAuthenticatedUser, usersController.getById);
router.route("/admin/user").get(usersController.getAllAdmin);
router
	.route("/admin/user/:userId")
	.get(usersController.getByIdAdmin)
	.put(usersController.updateByIdAdmin);

module.exports = router;
