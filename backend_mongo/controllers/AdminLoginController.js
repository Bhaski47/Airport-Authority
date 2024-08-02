const {Admin} = require('../models/AdminModel');
const bcrypt = require("bcrypt");

const AdminLoginController = async (req, res) => {
    try{
        const user =await Admin.findOne({email: req.body.email});
        if(!user) return res.status(200).send({status_code:404,message: 'User not found'});
        const validatePassword = await bcrypt.compare(req.body.password,user.password);
        if(!validatePassword) return res.status(200).send({status_code:401,message: 'Invalid Credentials'});
        return res.status(200).send({status_code: 200,data:user});
    }catch(err){
        res.status(500).send({status_code:500,message: 'Internal Server Error'});
    }
}

module.exports = {AdminLoginController};