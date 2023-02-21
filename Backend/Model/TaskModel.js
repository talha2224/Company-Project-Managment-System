const mongoose = require ('mongoose')

const TastratingSchema = mongoose.Schema({
    title1: {
      type: String,
      required: true
    },
    value1: {
      type: Number,
      required: true
    },

    title2: {
        type: String,
        required: true
    },
    value2: {
        type: Number,
        required: true
    },

    title3: {
        type: String,
        required: true
    },
    value3: {
        type: Number,
        required: true
    },
      
    title4: {
        type: String,
        required: true
      },
    value4: {
        type: Number,
        required: true
    },
      
    title5: {
        type: String,
        required: true
    },
    value5: {
        type: Number,
        required: true
    },

    title6: {
        type: String,
        required: true
    },
    value6: {
        type: Number,
        required: true
    },
    title7: {
        type: String,
        required: true
    },
    value7: {
        type: Number,
        required: true
    },

    title8: {
        type: String,
        required: true
    },
    value8: {
        type: Number,
        required: true
    },
  });
const taskSchema=mongoose.Schema({

    title:{type:String,required:true},

    description:{type:String,required:true},

    customer_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},

    developer_id:{type:Array,default:null},

    task_img:{type:Array,required:true},

    completed:{type:Boolean,default:false},
    
    completed_img:{type:Array},

    rating:[TastratingSchema],

    msg:{type:String,default:null},

    url:{type:String,default:null}
},{timestamps:true})


const Task = mongoose.model('task',taskSchema)
module.exports=Task