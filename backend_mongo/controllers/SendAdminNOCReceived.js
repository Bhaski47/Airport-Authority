const {ANOCApply} = require("../models/AdminNOCApply");
const {Admin} = require("../models/AdminModel");

const SendAdminNOCReceived = async(req, res) => {
    try{
        const adminNOCs = await ANOCApply.find();
        const emails = adminNOCs.map(emp => emp.email);
        const employee = await Admin.find({email:{$in:emails}});
        const data = adminNOCs.map(emp => {
            const noc = employee.find(noc => noc.email === emp.email)
            return {...emp.toObject(),...noc?.toObject()}
        })
        return res.status(200).send({status_code:200,data:data});
    }
    catch(e){
        res.status(500).send({status_code:500,message:"Something went wrong"});
    }
}

module.exports = {SendAdminNOCReceived};