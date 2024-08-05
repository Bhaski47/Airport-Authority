const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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
    department:{
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: true,
    }
})

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = {Admin};