const {CreateAdminController} = require("../controllers/CreateAdminController");
const {CreateAdminNOC} = require("../controllers/CreateAdminNOC");
const {AdminLoginController} = require("../controllers/AdminLoginController");
const {ApproveNOC} = require("../controllers/ApproveNOC");
const router = require('express').Router();

router.post("/create/admin",CreateAdminController);
router.post("/create/noc",CreateAdminNOC);
router.post("/login",AdminLoginController);
router.post("/approvenoc",ApproveNOC);

module.exports = router;