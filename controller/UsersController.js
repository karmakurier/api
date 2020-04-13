const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const models = require("../models/sequelize");

exports.getById = async (req, res, next) => {
	models.User.findOne({
		where: {
			id: req.user.data.id
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

exports.getByIdAdmin = async (req, res, next) => {
	if (req.user.data.role !== "ROLE_ADMIN") return res.sendStatus(403);

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
	if (req.user.data.role !== "ROLE_ADMIN") return res.sendStatus(403);

	models.User.findOne({
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
	models.User.findAll().then(users => {
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
	if (req.user.data.role !== "ROLE_ADMIN") return res.sendStatus(403);

	models.User.findAll({
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

exports.login = async (req, res, next) => {
	models.User.findOne({
		where: {
			email: req.body.email
		}
	}).then(async user => {
		if (!user) return res.sendStatus(404);

		const passwordIdentical = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (passwordIdentical) {
			/**
			 * Here we create the JWT token,
			 * because the login data is correct
			 * allowing the user to enter protected routes
			 */
			const token = jwt.sign(
				{
					data: {
						id: user.id
					}
				},
				process.env.JWT_SECRET,
				{expiresIn: "240h"}
			);
			return res.json({token});
		} else {
			return res.sendStatus(404);
		}
	});
};

exports.signup = async (req, res, next) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	models.User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
		zip: req.body.zip,
		city: req.body.city,
		street: req.body.street,
		hasCar: req.body.hasCar === true ? 1 : 0,
		hasBicycle: req.body.hasBicycle === true ? 1 : 0,
		acceptedPrivacyStatement: req.body.privacy === true ? 1 : 0,
		password: hashedPassword,
		role: "ROLE_USER"
	}).then(async user => {
		return res.sendStatus(200);
	});
};
