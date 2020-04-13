// Models
const models = require("../models/sequelize");

exports.create = async (req, res, next) => {
	const data = JSON.parse(req.body.data);
	models.Task.create({
		userId: null,
		status: "IS_PENDING",
		zip: data.zip,
		comment: data.comment,
		file: req.file.filename
	}).then(task => {
		res.json(task);
	});
};

exports.getById = async (req, res, next) => {
	models.Task.findOne({
		where: {
			id: req.params.taskId
		}
	}).then(task => {
		if (!task) return res.sendStatus(404);
		res.json(task);
	});
};

exports.update = async (req, res, next) => {
	models.Task.findOne({
		where: {
			id: req.params.taskId
		}
	}).then(async task => {
		if (!task) return res.sendStatus(404);

		if (req.body.status !== "IS_PENDING") {
			task.userId = req.user.data.id;
		} else {
			task.userId = null;
		}

		task.status = req.body.status;
		await task.save();
		res.json(task);
	});
};

exports.getAll = (req, res, next) => {
	models.Task.findAll({
		where: {
			status: "IS_PENDING"
		}
	}).then(tasks => {
		if (tasks.length === 0) return res.json([]);
		res.json(tasks);
	});
};

exports.getAllAdmin = (req, res, next) => {
	models.Task.findAll().then(tasks => {
		if (tasks.length === 0) return res.json([]);
		res.json(tasks);
	});
};

exports.getAllMy = (req, res, next) => {
	models.Task.findAll({
		where: {
			userId: req.user.data.id
		}
	}).then(tasks => {
		if (tasks.length === 0) return res.json([]);
		res.json(tasks);
	});
};
