module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define("news", {
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  return News;
};
