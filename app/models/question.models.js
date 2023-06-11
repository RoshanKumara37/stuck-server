module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("questions", {
    image: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.TEXT,
    },
    isRejected: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Question;
};
