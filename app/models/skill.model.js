module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define("skill", {
    profileId: {
      type: Sequelize.INTEGER,
      references: {
        model: "profiles",
        key: "id",
      },
    },
    skillName: { type: Sequelize.STRING },
  });

  return Skill;
};
