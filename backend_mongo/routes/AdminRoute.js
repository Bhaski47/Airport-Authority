const {CreateAdminController} = require("../controllers/CreateAdminController");
const {CreateAdminNOC} = require("../controllers/CreateAdminNOC");
const {AdminLoginController} = require("../controllers/AdminLoginController");
const router = require('express').Router();

router.post("/create/admin",CreateAdminController);
router.post("/create/noc",CreateAdminNOC);
router.post("/login",AdminLoginController);

module.exports = router;