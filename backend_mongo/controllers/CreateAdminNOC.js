const {ANOCApply} = require('../models/AdminNOCApply');
const {Admin} = require('../models/AdminModel');

const CreateAdminNOC = async(req, res) => {
    try{
        const user = await Admin.findOne({email: req.body.email});
        if(!user) return res.status(200).send({ status_code:400,message: 'Admin not found'});
        const { date , ...formData } = req.body;
        const applyingDate = new Date(date);
        const getDetails = ANOCApply.findOne({email: req.body.email})
        if(getDetails){
            const result = await ANOCApply.findOneAndUpdate(
                { email: req.body.email },
                { ...formData, applyingDate },
                { new: true, upsert: true })
            return res.status(200).send({status_code:200, message:"Application Updated Successfully"});
        }
        else await ANOCApply({...formData,applyingDate}).save();
        res.status(200).send({status_code:200, message:"Added Data"});
    }
    catch(err){
        res.status(200).send({status_code:500,message:"Internal Server Error"});
    }
}

module.exports = {CreateAdminNOC};