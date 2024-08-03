const {ENOCApply} = require("../models/EmployeeNOCApply");
const {Employee} = require("../models/EmployeeModel");

const SendNOCReceived = async(req, res) => {
    try{
        // const employees = await Employee.find();
        // const emails = employees.map(emp => emp.email);
        // const employeeNOCs = await ENOCApply.find({
        //     email: { $in: emails },
        //     creditSocietyClearance: { $ne: null }});
        //
        // const data = employees.map(emp => {
        //     const noc = employeeNOCs.find(noc => noc.email === emp.email);
        //     return { ...emp.toObject(), ...noc?.toObject() };
        // });
        const employeeNOCs = await ENOCApply.find();
        const emails = employeeNOCs.map(emp => emp.email);
        const employee = await Employee.find({email:{$in:emails}});
        const data = employeeNOCs.map(emp => {
            const noc = employee.find(noc => noc.email === emp.email)
            return {...emp.toObject(),...noc?.toObject()}
        })
        return res.status(200).send({status_code:200,data:data});
    }
    catch(e){
        res.status(500).send({status_code:500,message:"Something went wrong"});
    }
}

module.exports = {SendNOCReceived};