const {ENOCApply} = require('../models/EmployeeNOCApply');
const {Employee} = require('../models/EmployeeModel');

const FetchEmployeeNOC = async(req, res) => {
    try{
        const user = await Employee.findOne({email: req.body.email});
        if(!user) return res.status(200).send({ status_code:400,message: 'Employee not found'});
        const getDetails = await ENOCApply.findOne({email: req.body.email})
        if(getDetails) {
            const data = {
                ...getDetails,
            }
            return res.status(200).send({status_code:200,data:getDetails});
        }
        else return res.status(200).send({status_code:404, message:"No data"});
    }
    catch(err){
        res.status(200).send({status_code:500,message:"Internal Server Error"});
    }
}

module.exports = {FetchEmployeeNOC};