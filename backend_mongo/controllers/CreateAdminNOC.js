const {ANOCApply} = require('../models/AdminNOCApply');
const {Admin} = require('../models/AdminModel');

const CreateAdminNOC = async(req, res) => {
    try{
        const user = await Admin.findOne({email: req.body.email});
        if(!user) return res.status(200).send({ status_code:400,message: 'Admin not found'});
        await ANOCApply({...req.body}).save();
        res.status(200).send({status_code:200, message:"Added Data"});
    }
    catch(err){
        res.status(200).send({status_code:500,message:"Internal Server Error"});
    }
}

module.exports = {CreateAdminNOC};