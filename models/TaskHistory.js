const Sequelize = require("sequelize");
const sequelize = require("../controller/DBConn.js");

const TaskHistory = sequelize.define(
	"task_history",
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		taskId: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		action: {
			type: Sequelize.STRING,
			allowNull: false
		},
		entity: {
			type: Sequelize.STRING,
			allowNull: false
		},
		comment: {
			type: Sequelize.STRING,
			allowNull: true
		},
		oldId: {
			type: Sequelize.INTEGR,
			allowNull: true
		},
		newId: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
	{
		freezeTableName: true
	}
);

module.exports = TaskHistory;
