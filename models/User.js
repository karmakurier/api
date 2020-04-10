const Sequelize = require("sequelize");
const sequelize = require("../controller/DBConn.js");

const User = sequelize.define(
	"user",
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: false
		},
		street: {
			type: Sequelize.STRING,
			allowNull: false
		},
		zip: {
			type: Sequelize.STRING,
			allowNull: false
		},
		city: {
			type: Sequelize.STRING,
			allowNull: false
		},
		hasCar: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		hasBicycle: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		acceptedPrivacyStatement: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		role: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		freezeTableName: true
	}
);

module.exports = User;
