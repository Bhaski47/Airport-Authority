const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
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

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = {Employee};