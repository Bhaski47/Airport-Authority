const {CreateAdminController} = require("../controllers/CreateAdminController");
const {CreateAdminNOC} = require("../controllers/CreateAdminNOC");
const {AdminLoginController} = require("../controllers/AdminLoginController");
const {ApproveNOC} = require("../controllers/ApproveNOC");
const {EmployeeNOCStatus} = require("../controllers/EmployeeNOCStatus");
const {SendAdminNOCReceived} = require("../controllers/SendAdminNOCReceived");
const {FetchAdminNOC} = require("../controllers/FetchAdminNOC");
const {AdminNOCStatus} = require("../controllers/AdminNOCStatus");

const router = require('express').Router();

router.post("/create/admin",CreateAdminController);
router.post("/create/noc",CreateAdminNOC);
router.post("/login",AdminLoginController);
router.post("/approvenoc",ApproveNOC);
router.post('/send/noc', SendAdminNOCReceived);
router.post('/fetch/noc', FetchAdminNOC);
router.post('/send/nocdetails',AdminNOCStatus);

module.exports = router;