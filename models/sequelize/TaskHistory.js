module.exports = (sequelize, DataTypes) => {

	const TaskHistory = sequelize.define(
		"task_history",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			taskId: {
				type: DataTypes.INTEGER,
				allowNull: true
			},
			action: {
				type: DataTypes.STRING,
				allowNull: false
			},
			entity: {
				type: DataTypes.STRING,
				allowNull: false
			},
			comment: {
				type: DataTypes.STRING,
				allowNull: true
			},
			oldId: {
				type: DataTypes.INTEGER,
				allowNull: true
			},
			newId: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{
			freezeTableName: true
		}
	);

	return TaskHistory;
}
