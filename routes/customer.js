var express = require("express");
var router = express.Router();
var multer = require("multer");

// Controller
const usersController = require("../controller/UsersController");
const tasksController = require("../controller/TasksController");

// Models
const User = require("../models/User");

router.use(function(req, res, next) {
	if (req.user && !req.user.data.id) return res.sendStatus(404);
	User.findOne({
		where: {
			id: req.user.data.id
		}
	}).then(user => {
		if (user.role !== "ROLE_USER" && user.role !== "ROLE_ADMIN")
			return res.sendStatus(403);

		if (user) req.user.data.role = user.role;
		next();
	});
});

// Multer
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "public/voicemails/");
	},
	filename: function(req, file, cb) {
		let fileType = file.originalname.split(".")[
			file.originalname.split(".").length - 1
		];
		cb(null, `${req.user.data.id}-voicemail-${Date.now()}.${fileType}`);
	}
});
const uploadVoicemail = multer({ storage: storage });

// ROUTES

// Me
router.route("/me").get(usersController.getById);
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
