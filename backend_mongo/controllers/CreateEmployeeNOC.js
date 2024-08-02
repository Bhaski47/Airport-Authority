const {ENOCApply} = require('../models/EmployeeNOCApply');
const {Employee} = require('../models/EmployeeModel');

const CreateEmployeeNOC = async(req, res) => {
    try{
        const user = await Employee.findOne({email: req.body.email});
        if(!user) return res.status(200).send({ status_code:400,message: 'Employee not found'});
        await ENOCApply({...req.body}).save();
        res.status(200).send({status_code:200, message:"Added Data"});
    }
    catch(err){
        res.status(200).send({status_code:500,message:"Internal Server Error"});
    }
}

module.exports = {CreateEmployeeNOC};