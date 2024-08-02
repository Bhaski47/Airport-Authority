const {CreateEmployeeController} = require('../controllers/CreateEmployeeController');
const {CreateEmployeeNOC} = require('../controllers/CreateEmployeeNOC');
const EmployeeLoginController = require("../controllers/EmployeeLoginController");
const router = require('express').Router();

router.post('/create/employee', CreateEmployeeController);
router.post('/create/noc', CreateEmployeeNOC);
router.post('/login', EmployeeLoginController);

module.exports = router;