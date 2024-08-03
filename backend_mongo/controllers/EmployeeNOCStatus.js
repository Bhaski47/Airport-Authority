const {ENOCApply} = require('../models/EmployeeNOCApply');

const EmployeeNOCStatus =async(req,res)=>{
    try{
        const user = await ENOCApply.findOne({email: req.body.email});
        if(!user) return res.status(200).send({status_code:404,message:'Apply the form'});
        let download;
        if( (user.societyValidated && user.estateValidated && user.securityValidated && user.hrValidated && user.itValidated) === 'Verified') download = false
        else download = true;
        const data = {
            it: user.itValidated,
            hr: user.hrValidated,
            security: user.securityValidated,
            estate: user.estateValidated,
            society: user.societyValidated,
            download: download
        };
        return res.status(200).json({status_code:200,data:data});
    }
    catch(err){
        res.status(200).send({status_code:500,message:"Internal Server Error"});
    }
}

module.exports = {EmployeeNOCStatus};