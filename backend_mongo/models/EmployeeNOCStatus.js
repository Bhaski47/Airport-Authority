const mongoose = require('mongoose');

const EmployeeNOCStatus = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: true,
    }
})

const ENOCStatus = mongoose.model("ENOCStatus", EmployeeNOCStatus);

module.exports = {ENOCStatus};