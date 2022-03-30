const { Router } = require("express");
const { ROUTES } = require("../constants/appConstants");
const appController = require("../controller/appController");
const router = Router();

router.get(ROUTES.DEMO, appController.demo);

module.exports = router;
