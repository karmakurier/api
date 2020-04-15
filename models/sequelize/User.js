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
			address: {
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
			acceptedPrivacyStatement: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			allowedCalls: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			isVerified: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			smsConfirmed: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			password: {
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