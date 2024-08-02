const {Admin} = require('../models/AdminModel');
const bcrypt = require("bcrypt");

const CreateAdminController = async (req, res) => {
    try{
        const user = await Admin.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).send({status_code:400,message:"Admin already exists"});
        }
        const saltRounds = parseInt(process.env.SALT, 10);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await Admin({...req.body, password: hashedPassword}).save();
        res.status(200).json({status_code:200,message: 'Created Account for Admin'});
    }
    catch (e){
        res.status(500).json({status_code:500,error: e});
    }
}

module.exports = {CreateAdminController};