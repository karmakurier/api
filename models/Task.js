const Sequelize = require("sequelize");
const sequelize = require("../controller/DBConn.js");

const Task = sequelize.define(
	"task",
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		status: {
			type: Sequelize.STRING,
			allowNull: false
		},
		zip: {
			type: Sequelize.STRING,
			allowNull: false
		},
		comment: {
			type: Sequelize.STRING,
			allowNull: true
		},
		file: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		freezeTableName: true
	}
);

module.exports = Task;
