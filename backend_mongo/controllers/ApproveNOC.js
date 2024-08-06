const {ENOCApply} = require("../models/EmployeeNOCApply");
const {Employee} = require("../models/EmployeeModel");

const ApproveNOC = async (req, res) => {
    try{
        // console.log(req.body)
        const employeeNOC = ENOCApply.findOne({email:req.body.email});
        if (!employeeNOC) res.status(200).send({status_code:404,message: 'No employee found'});
        let updateField;
        if (req.body.adminDepartment === "IT") updateField = "itValidated";
        else if (req.body.adminDepartment === "HR") updateField = "hrValidated";
        else if (req.body.adminDepartment === "SECURITY") updateField = "securityValidated";
        else if (req.body.adminDepartment === "ESTATE") updateField = "estateValidated";
        else if (req.body.adminDepartment === "SOCIETY") updateField = "societyValidated";
        else return res.status(400).send({ status_code: 400, message: "Department not found" });
        if(req.body.num === 1){
        await ENOCApply.updateOne(
            { email: req.body.email },
            { $set: { [updateField]: "Verified" } }
        );
        res.status(200).send({ status_code: 200, message: 'NOC approved successfully' });
        }
        else if(req.body.num ===2){
            await ENOCApply.updateOne(
                { email: req.body.email },
                { $set: { [updateField]: req.body.comment } }
            );
            res.status(200).send({ status_code: 200, message: 'NOC Rejected' });
        }
    }
    catch (e) {
        res.status(500).send({status: 500, message: e.message});
    }
}

module.exports={ApproveNOC};
