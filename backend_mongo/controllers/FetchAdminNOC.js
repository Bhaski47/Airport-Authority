const {ANOCApply} = require('../models/AdminNOCApply');
const {Admin} = require('../models/AdminModel');

const FetchAdminNOC = async(req, res) => {
    try{
        const user = await Admin.findOne({email: req.body.email});
        if(!user) return res.status(200).send({ status_code:400,message: 'Admin not found'});
        const getDetails = await ANOCApply.findOne({email: req.body.email})
        if(getDetails) {
            return res.status(200).send({status_code:200,data:getDetails});
        }
        else return res.status(200).send({status_code:404, message:"No data"});
    }
    catch(err){
        res.status(200).send({status_code:500,message:"Internal Server Error"});
    }
}

module.exports = {FetchAdminNOC};
