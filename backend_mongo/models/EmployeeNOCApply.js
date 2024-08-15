const mongoose = require('mongoose');

const EmployeeNOCApplySchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    bookReturn_lang: { type: String, required: true, default: "no" },
    gemUser_it: { type: String, required: true, default: "no" },
    gemId_it: { type: String, default: null },
    gemIdTransfer_it: { type: String, default: "no" },
    applyingDate: { type: Date, required: true },
    creditSocietyMember_society: { type: String, default: "no" },
    creditSocietyClearance: { type: String, default: null },
    pmsSubmission_stores: { type: String, default: "no" },
    accessCardReturn: { type: String, default: "no" },
    registerReturn_stores: { type: String, default: "no" },
    itAssetsReturn_it: { type: String, default: "no" },
    sapUser_it: { type: String, default: "no" },
    sapId_it: { type: String, default: null },
    residentialQuarters_hr: { type: String, default: "no" },
    cpppUser_it: { type: String, default: "no" },
    cpppId_it: { type: String, default: null },
    employeeCardReturn_hr: { type: String, default: "no" },
    nocReason: { type: String, default: "Transfer" },
    societyId_society:{type: String,default:null},
    biometricTransfer_hr: { type: String, default: "no" },
    officeDuesDetailed_finance: { type: String, default: "no" },
    identityCardReturn_security: { type: String, default: "no" },
    pendingEOfficeFiles_it: { type: String, default: "no" },
    itValidated: { type: String, default: "Pending" },
    hrValidated: { type: String, default: "Pending" },
    securityValidated: { type: String, default: "Pending" },
    estateValidated: { type: String, default: "Pending" },
    societyValidated: { type: String, default: "Pending" }
});

const ENOCApply = mongoose.model("ENOCApply", EmployeeNOCApplySchema);

module.exports = { ENOCApply };
