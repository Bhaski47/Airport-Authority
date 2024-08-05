const mongoose = require('mongoose');

const AdminNOCApply = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    bookReturn: {
        type: String,
        required: true,
        default: "no"
    },
    gemUser: {
        type: String,
        required: true,
        default: "no"
    },
    gemId: {
        type: String,
        default: null // Made optional
    },
    gemIdTransfer: {
        type: String,
        default: "no" // Made optional
    },
    applyingDate: {
        type: Date,
        required: true,
    },
    aaiThrift: {
        type: String,
        default: "no"
    },
    pms: {
        type: String,
        default: "no"
    },
    accessCard: {
        type: String,
        default: "no"
    },
    documentReturn: {
        type: String,
        default: "no"
    },
    assets: {
        type: String,
        default: "no"
    },
    sapId: {
        type: String,
        default: "no" // Made optional
    },
    sapIdInfo: {
        type: String,
        default: "no"
    },
    surrenderQuarters: {
        type: String,
        default: "no"
    },
    cpppUser: {
        type: String,
        default: "no"
    },
    cpppId: {
        type: String,
        default: null // Made optional
    },
    aaiEmployeeCard: {
        type: String,
        default: "no"
    },
    applyNOC: {
        type: String,
        default: "Transfer"
    },
    transferAttendanceSystem: {
        type: String,
        default: "no"
    },
    officeDue: {
        type: String,
        default: "no"
    },
    returnId: {
        type: String,
        default: "no"
    },
    itValidated: {
        type: String,
        default: "Pending",
    },
    hrValidated: {
        type: String,
        default: "Pending",
    },
    securityValidated: {
        type: String,
        default: "Pending",
    },
    estateValidated: {
        type: String,
        default: "Pending",
    },
    societyValidated: {
        type: String,
        default: "Pending",
    },
    creditSocietyClearance: {
        type: String,
        default: null // New field based on request data
    },
    pmsSubmission: {
        type: String,
        default: null // New field based on request data
    },
    accessCardReturn: {
        type: String,
        default: null // New field based on request data
    },
    registerReturn: {
        type: String,
        default: null // New field based on request data
    },
    itAssetsReturn: {
        type: String,
        default: null // New field based on request data
    },
    sapUser: {
        type: String,
        default: null // New field based on request data
    },
    residentialQuarters: {
        type: String,
        default: null // New field based on request data
    },
    employeeCardReturn: {
        type: String,
        default: null // New field based on request data
    },
    nocReason: {
        type: String,
        default: null // New field based on request data
    },
    biometricTransfer: {
        type: String,
        default: null // New field based on request data
    },
    officeDues: {
        type: String,
        default: null // New field based on request data
    },
    identityCardReturn: {
        type: String,
        default: null // New field based on request data
    }
});

const ANOCApply = mongoose.model("ANOCApply", AdminNOCApply);

module.exports = {ANOCApply};