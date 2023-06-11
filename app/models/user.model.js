module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		email: { type: Sequelize.STRING },
		password: { type: Sequelize.STRING },
		isAdmin: { type: Sequelize.BOOLEAN },
		first_name: { type: Sequelize.STRING },
		last_name: { type: Sequelize.STRING },
		mobile: { type: Sequelize.STRING },
		birthday: { type: Sequelize.DATE },
		gender: { type: Sequelize.STRING },
		profession: { type: Sequelize.STRING },
	});
	return User;
};
