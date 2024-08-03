const {ENOCApply} = require('../models/EmployeeNOCApply');
const {Employee} = require('../models/EmployeeModel');

const CreateEmployeeNOC = async(req, res) => {
    try{
        const user = await Employee.findOne({email: req.body.email});
        if(!user) return res.status(200).send({ status_code:400,message: 'Employee not found'});
        const { date , ...formData } = req.body;
        const applyingDate = new Date(date);

        const getDetails = ENOCApply.findOne({email: req.body.email})
        if(getDetails){
            const result = await ENOCApply.findOneAndUpdate(
                { email: req.body.email },
                { ...formData, applyingDate },
                { new: true, upsert: true })
            return res.status(200).send({status_code:200, message:"Application Updated Successfully"});
        }
        else await ENOCApply({...formData,applyingDate}).save();
        res.status(200).send({status_code:200,message:"Application Created Successfully"});
    }
    catch(err){
        res.status(200).send({status_code:500,message:"Internal Server Error"});
    }
}

module.exports = {CreateEmployeeNOC};