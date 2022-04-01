const { Point, Comment } = require("../orm/sequelize");

module.exports.all_points_get = async (req, res) => {
  const imageId = req.query.imageId;
  const points = await Point.findAll({
    where: { imageId },
  });

  res.json({ msg: "SUCCESS", data: points });
};

module.exports.all_comments_get = async (req, res) => {
  const imageId = req.query.imageId;
  const gridLocation = req.query.gridLocation;

  const comments = await Comment.findAll({
    where: { imageId, pointId: `${imageId}_${gridLocation}` },
  });
  res.json({ msg: "SUCCESS", data: comments });
};

module.exports.new_comment_post = async (req, res) => {
  const { text, imageId, addPointToo, gridLocation } = req.body;

  if (addPointToo) {
    try {
      const data = await Point.create({
        pointId: `${imageId}_${gridLocation}`,
        imageId,
        gridLocation,
      });
    } catch (err) {
      console.log(err);
    }
  }

  try {
    await Comment.create({
      text,
      pointId: `${imageId}_${gridLocation}`,
      imageId,
      commentId: (Math.random() + 1).toString(36).substring(7),
    });
  } catch (err) {
    console.log(err);
  }
  const comments = await Comment.findAll({
    where: { imageId, pointId: `${imageId}_${gridLocation}` },
  });
  res.json({ msg: "SUCCESS", data: comments });
};
