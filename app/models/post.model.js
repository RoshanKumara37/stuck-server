module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("posts", {
    image: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  });

  return Post;
};
