module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false
			},
			street: {
				type: DataTypes.STRING,
				allowNull: false
			},
			zip: {
				type: DataTypes.STRING,
				allowNull: false
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false
			},
			hasCar: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			hasBicycle: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			acceptedPrivacyStatement: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			freezeTableName: true
		}
	);

	return User;
}