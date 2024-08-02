const mongoose = require('mongoose');

const EmployeeNOCApply = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    bookReturn: {
        type: String,
        required: true,
    },
    gemUser: {
        type: String,
        required: true,
        unique: true,
    },
    gemId: {
        type: String,
        required: true,
    },
    gemIdTransfer: {
        type: String,
        required: true,
    },
    applyingDate: {
        type: Date,
        required: true,
    },
    aaiThrift: {
        type: String,
        required: true,
    },
    pms: {
        type: String,
        required: true,
    },
    accessCard: {
        type: String,
        required: true,
    },
    documentReturn: {
        type: String,
        required: true,
    },
    assets: {
        type: String,
        required: true,
    },
    sapId: {
        type: String,
        required: true,
    },
    surrenderQuarters: {
        type: String,
        required: true,
    },
    cpppUser: {
        type: String,
        required: true,
    },
    cpppId: {
        type: String,
        required: true,
    },
    aaiEmployeeCard: {
        type: String,
        required: true,
    },
    applyNOC: {
        type: String,
        required: true,
    },
    transferSystem: {
        type: String,
        required: true,
    },
    officeDue: {
        type: String,
        required: true,
    },
    returnId: {
        type: String,
        required: true,
    },
    validated:{
        type: Boolean,
        default: false,
    }
})

const ENOCApply = mongoose.model("ENOCApply", EmployeeNOCApply);

module.exports = {ENOCApply};