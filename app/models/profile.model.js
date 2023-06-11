module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profile", {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    image: { type: Sequelize.STRING },
    profileName: { type: Sequelize.STRING },
    university: { type: Sequelize.STRING },
    workPlace: { type: Sequelize.STRING },
    school: { type: Sequelize.STRING },

    // skills : { type: Sequelize.STRING(1000) },
  });

  return Profile;
};
