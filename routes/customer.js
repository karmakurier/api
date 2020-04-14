var express = require("express");
var router = express.Router();
var multer = require("multer");
var passport = require('passport');

let isAuthenticated = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user) => {
		
		if (user) {
			let plainuser = user.get({ plain: true});
			if (plainuser.role !== "ROLE_USER" && plainuser.role !== "ROLE_ADMIN")
				return res.sendStatus(403);
			req.user = plainuser;
			next();
		} else {
			res.status(401).send();
		}
	})(req, res, next);

}

// Controller
const usersController = require("../controller/UsersController");
const tasksController = require("../controller/TasksController");

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

// Me
router.route("/me").get(isAuthenticated, usersController.getById);
router.route("/admin/user").get(usersController.getAllAdmin);
router
	.route("/admin/user/:userId")
	.get(usersController.getByIdAdmin)
	.put(usersController.updateByIdAdmin);

// Task
router
	.route("/admin/task")
	.post(uploadVoicemail.single("voicemail"), tasksController.create);
router.route("/task").get(tasksController.getAll);
router.route("/me/task").get(tasksController.getAllMy);
router.route("/admin/task").get(tasksController.getAllAdmin);
router
	.route("/task/:taskId")
	.get(tasksController.getById)
	.put(tasksController.update);

module.exports = router;
