const mongoose=require('mongoose')

const DeveloperSchema=new mongoose.Schema({
    developer_name:{
        type:String,
        required:true
    },
    developer_email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    customer_id:{
        type:String,
        default:null
    },
    overall_rating:{
        type:Array,
        default:null
    }
},{timestamps:true})

const Developers=mongoose.model('Developer',DeveloperSchema)
module.exports=Developers