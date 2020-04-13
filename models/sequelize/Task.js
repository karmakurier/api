module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define(
		"task",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: true
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false
			},
			zip: {
				type: DataTypes.STRING,
				allowNull: false
			},
			comment: {
				type: DataTypes.STRING,
				allowNull: true
			},
			file: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			freezeTableName: true
		}
	);

	return Task;
}
