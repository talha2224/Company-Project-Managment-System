const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    useremail:
    {
        type:String,
        required:true
    },
    password:{
        type:String
    },
    developer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Developers',
        default:null
    }

},{timestamps:true})

const User=mongoose.model('User',UserSchema)

module.exports = User