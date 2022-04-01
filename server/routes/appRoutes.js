const { Router } = require("express");
const { ROUTES } = require("../constants/appConstants");
const appController = require("../controller/appController");
const router = Router();

router.get(ROUTES.ALL_POINTS_GET, appController.all_points_get);
router.get(ROUTES.ALL_COMMENTS_GET, appController.all_comments_get);
router.post(ROUTES.NEW_COMMENT_POST, appController.new_comment_post);

module.exports = router;
