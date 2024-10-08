const {ANOCApply} = require('../models/AdminNOCApply');

const AdminNOCStatus =async(req,res)=>{
    try{
        const user = await ANOCApply.findOne({email: req.body.email});
        if(!user) return res.status(200).send({status_code:404,message:'Apply the form'});
        let download;
        if (user.societyValidated === 'Verified' &&
            user.estateValidated === 'Verified' &&
            user.securityValidated === 'Verified' &&
            user.hrValidated === 'Verified' &&
            user.itValidated === 'Verified') {
            download = false;
        }

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

module.exports = {AdminNOCStatus};
