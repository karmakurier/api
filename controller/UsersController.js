const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const models = require("../models/sequelize");

exports.getById = async (req, res, next) => {
	models.user.findOne({
		where: {
			id: req.user.id
		},
		attributes: [
			"firstName",
			"lastName",
			"email",
			"createdAt",
			"updatedAt"
		]
	}).then(user => {
		if (!user) return res.sendStatus(404);
		res.json(user);
	});
};

exports.getByIdAdmin = async (req, res, next) => {
	if (req.user.role !== "ROLE_ADMIN") return res.sendStatus(403);

	models.User.findOne({
		where: {
			id: req.params.userId
		},
		attributes: [
			"firstName",
			"lastName",
			"email",
			"role",
			"createdAt",
			"updatedAt"
		]
	}).then(user => {
		if (!user) return res.sendStatus(404);
		res.json(user);
	});
};

exports.updateByIdAdmin = async (req, res, next) => {
	if (req.user.role !== "ROLE_ADMIN") return res.sendStatus(403);

	models.user.findOne({
		where: {
			id: req.params.userId
		},
		attributes: [
			"id",
			"firstName",
			"lastName",
			"email",
			"role",
			"createdAt",
			"updatedAt"
		]
	}).then(async user => {
		if (!user) return res.sendStatus(404);
		user.role = req.body.role;
		await user.save();
		res.json(user);
	});
};

exports.getAll = (req, res, next) => {
	models.user.findAll().then(users => {
		if (users.length === 0) return res.json({});
		let sanitizedUser = [];
		for (let i = 0; i < users.length; i += 1) {
			sanitizedUser.push({
				firstName: users[i].firstName,
				lastName: users[i].lastName,
				email: users[i].email,
				role: users[i].role,
				id: users[i].id
			});
		}
		res.json(sanitizedUser);
	});
};

exports.getAllAdmin = (req, res, next) => {
	if (req.user.role !== "ROLE_ADMIN") return res.sendStatus(403);

	models.user.findAll({
		attributes: [
			"id",
			"firstName",
			"lastName",
			"email",
			"role",
			"createdAt",
			"updatedAt"
		]
	}).then(users => {
		if (users.length === 0) return res.json([]);
		res.json(users);
	});
};

exports.signup = async (req, res, next) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	models.role.findOne({ where: { name: "USER"}}).then(defaultRole => {
		let plainRole = defaultRole.get({ plain: true});

		models.user.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			zip: req.body.zip,
			city: req.body.city,
			address: req.body.address,
			acceptedPrivacyStatement: req.body.acceptedPrivacyStatement,
			allowedCalls: req.body.allowedCalls,
			isVerified: false,
			smsConfirmed: false,
			password: hashedPassword,
			roleId: plainRole.id
		}).then(async user => {
			return res.send(user);
		}).catch(e => {
			console.log(e);
			return res.status(500);
		});
	});
};
