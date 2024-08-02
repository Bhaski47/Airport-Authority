const {Employee} = require('../models/EmployeeModel');
const bcrypt = require("bcrypt");

const EmployeeLoginController = async (req, res) => {
    try{
        const user =await Employee.findOne({email: req.body.email});
        if(!user) return res.status(200).send({status_code:401,message: 'User not found'});
        const validatePassword = await bcrypt.compare(req.body.password,user.password);
        if(!validatePassword) return res.status(200).send({status_code:401,message: 'Invalid Credentials'});
        return res.status(200).send({status_code: 200,data:user});
    }catch(err){
        res.status(500).send({status_code:500,message: 'Internal Server Error'});
    }
}

module.exports = EmployeeLoginController;