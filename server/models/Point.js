module.exports = (sequelize, type) => {
  return sequelize.define("Points", {
    pointId: {
      type: type.STRING,
      primaryKey: true,
    },
    imageId: {
      type: type.INTEGER,
    },
    gridLocation: type.STRING,
  });
};
