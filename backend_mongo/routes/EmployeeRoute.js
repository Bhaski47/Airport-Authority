const {CreateEmployeeController} = require('../controllers/CreateEmployeeController');
const {CreateEmployeeNOC} = require('../controllers/CreateEmployeeNOC');
const {SendNOCReceived} = require('../controllers/SendNOCReceived');
const EmployeeLoginController = require("../controllers/EmployeeLoginController");
const {EmployeeNOCStatus} = require("../controllers/EmployeeNOCStatus");
const {FetchEmployeeNOC} = require("../controllers/FetchEmployeeNOC");
const router = require('express').Router();

router.post('/create/employee', CreateEmployeeController);
router.post('/create/noc', CreateEmployeeNOC);
router.post('/login', EmployeeLoginController);
router.post('/send/noc', SendNOCReceived);
router.post('/send/nocdetails', EmployeeNOCStatus);
router.post('/fetch/noc', FetchEmployeeNOC);

module.exports = router;