const {Employee} = require('../models/EmployeeModel');
const bcrypt = require("bcrypt");

const CreateEmployeeController = async (req, res) => {
    try{
        console.log(req.body)
        const user = await Employee.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).send({status_code:400,message:"Employee already exists"});
        }
        const saltRounds = parseInt(process.env.SALT, 10);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await Employee({...req.body, password: hashedPassword}).save();
        res.status(200).json({status_code:200,message: 'Created Account for Employee'});
    }
    catch (e){
        res.status(500).json({status_code:500,error: e});
    }
}

module.exports = {CreateEmployeeController};