module.exports = (sequelize, type) => {
  return sequelize.define("Comments", {
    pointId: {
      type: type.STRING,
    },
    imageId: {
      type: type.INTEGER,
    },
    commentId: { type: type.STRING },
    text: type.STRING,
  });
};
