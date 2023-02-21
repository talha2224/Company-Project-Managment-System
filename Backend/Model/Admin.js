const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{type:String},
    date:{
        type: Date,
        default: Date.now
    },
});

const admin= mongoose.model('admin', adminSchema);      
module.exports = admin;      