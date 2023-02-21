const Task = require('../Model/TaskModel')
const multer = require('multer')
const router = require ('express').Router()
const mongoose = require ('mongoose')
const nodemailer=require('nodemailer')

// MULTER CONFIGURATION:-
const imgconfig=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./taskimage')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`);
    }
})

const isImage=(req,file,cb)=>{
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } 
    else {
      cb(null, false);
    }
}

const upload=multer({
    storage:imgconfig,
    fileFilter:isImage
}) 

//POST TASK
router.post('/post/task',upload.array('TaskImage',10),async(req,res)=>{
    const {title,desc,customer_id,developer_id}=req.body
    
    // const {filename}=req.files
    try{
        const newTask= await Task.create({title:title, description:desc, customer_id:customer_id,developer_id:developer_id, task_img:req.files})
        
        if(newTask)
        {
            res.status(201).json(newTask)
        }

        else
        {
            res.status(400).json({msg:"Task Not Created"})
        }
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({msg:"something wents wrong"})
    }
})

//GET TASK
mongoose.set('strictPopulate', false);

router.get('/get/task',async(req,res)=>{
    try{
        const getTask=await Task.find().populate('customer_id').sort({ createdAt: -1 });
        if(getTask){
            res.status(200).json(getTask)
        }
        else{
            res.status(404).json({msg:"NO DATA FOUND"})
        }
    } 
    catch (error) {
        res.status(500).json({msg:"SOMETHING WENT WRONG STARTING ERROR"})
        console.log(error)
    }
})

//GET SINGLE TASK

router.get('/get/single/task/:id',async(req,res)=>{
    if(req.params.id)
    {
        try {
           const singleTask=await Task.findOne({_id:req.params.id}).populate('customer_id')
           if(singleTask){res.status(200).json(singleTask)}
           else{res.status(404).json({msg:"no data found"}) }
        } 
        catch (error) {
           res.status(500).json({msg:"server error params not found"}) 
           console.log(error)
        }
    }
})

//UPDATE SINGLE TASK

router.put('/update-task/:taskid',async(req,res)=>{
    try{
        const Update=await Task.findByIdAndUpdate(req.params.taskid,{$set:req.body},{new:true})
        if(Update){
            res.status(200).json(Update)
        }

        else{
            res.status(404).json({msg:"something wents wrong"})
        }
    } 
    catch (error) {
        res.status(500).json({msg:"id not matched"})
        console.log(error)
    }
})

//UPDATE TASK WHEN TASK COMPLETED AND NOTIFY CUSTOMER BY EMAIL
router.put('/update-task/msg/:taskid',upload.array('completed_img',10),async(req,res)=>{
    const {c_name,c_email,completed,msg,url}=req.body
    try{
        const Update=await Task.findByIdAndUpdate(req.params.taskid,{completed:completed,msg:msg,url:url,completed_img:req.files},{new:true})

        const transporter=nodemailer.createTransport({service:"gmail",auth:{
            user:'talhahaider074@gmail.com',
            pass:'lwmhcalesfkafrzp'
        }});
        const mailOption={
            from:'talhahaider074@gmail.com',
            to:c_email,
            subject:`TASK COMPLETED`,
            html:`<p>Dear ${c_name} your task has been completed please go to this url and login to your accounnt <a href='http://localhost:3000/user'>Click Here<a/> </p>`
        }
        if(Update){        
            transporter.sendMail(mailOption,(e,info)=>{
                // if(e){
                //     console.log(e,'email not sent')
                // }
            })
            res.status(200).json(Update)
        }

        else{
            res.status(404).json({msg:"something wents wrong"})
        }
    } 
    catch (error) {
        res.status(500).json({msg:"id not matched"})
        console.log(error)
    }
})

//UPDATE TASK WHEN CUSTOMER GIVE RATING
router.put('/update-task/rating/:taskid',async(req,res)=>{
    try{
        const Update=await Task.findByIdAndUpdate(req.params.taskid,{$set:req.body},{new:true})
        if(Update){        
            res.status(200).json(Update)
        }

        else{
            res.status(404).json({msg:"something wents wrong"})
        }
    } 
    catch (error) {
        res.status(500).json({msg:"id not matched"})
        console.log(error)
    }
})

//get task when rating is given

router.get('/get/task/rating/:id',async(req,res)=>{
    if(req.params.id){
        const getTask=await Task.find({developer_id:req.params.id,rating:{ $exists: true, $ne: [] }}).populate('customer_id')
        if(getTask){
            res.status(200).json(getTask)
        }
    }
})

//get task rating for only previous month:
router.get('/get/task/rating/month/:id',async(req,res)=>{
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1),'date';
    // const utcOneMonthAgo = oneMonthAgo.toISOString();
    if(req.params.id){
        try {

            const getTask=await Task.find({developer_id:req.params.id,createdAt: { $lte: oneMonthAgo },rating:{ $exists: true, $ne: [] }})
            if(getTask){
                console.log(oneMonthAgo,getTask)
                res.status(200).json(getTask)
            }
        } catch (error) {
            console.log(error)
        }
    }
})


//GET TASK BY DEVELOPER ID :-
router.get('/task/developer_id/:id',async(req,res)=>{
    if(req.params.id){
        try {
            const find=await Task.find({developer_id:req.params.id.trim()}).populate('customer_id').sort({createdAt:-1})
                if(find){
                    return res.status(200).json(find)
                }
                else{

                    return res.status(404).json({msg:"no task assignesd"})
                }
        } 
        catch(error) {
            console.log(error)
            res.status(500).json({msg:"id found but something going wrong in try block"})
        }
    }
    else{
        res.status(404).json({msg:"ID IN PARAMETER NOT FOUND"})
    }
})


//GET TASK BY DEVELOPER ID IF TASK IS COMPLETED :-

router.get('/task/developer_id/complete/:id',async(req,res)=>{
    if(req.params.id){
        try {
            const find=await Task.find({developer_id:req.params.id.trim(),completed:true}).populate('customer_id').sort({createdAt:-1})
                if(find){
                    return res.status(200).json(find)
                }
                else{

                    return res.status(404).json({msg:"no task assignesd"})
                }
        } 
        catch(error) {
            console.log(error)
            res.status(500).json({msg:"id found but something going wrong in try block"})
        }
    }
    else{
        res.status(404).json({msg:"ID IN PARAMETER NOT FOUND"})
    }
})


//GET TASK BY DEVELOPER ID IF TASK IS PENDING:-
router.get('/task/developer_id/pending/:id',async(req,res)=>{
    if(req.params.id){
        try {
            const find=await Task.find({developer_id:req.params.id.trim(),completed:false}).populate('customer_id').sort({createdAt:-1})
                if(find){
                    return res.status(200).json(find)
                }
                else{

                    return res.status(404).json({msg:"no task assignesd"})
                }
        } 
        catch(error) {
            console.log(error)
            res.status(500).json({msg:"id found but something going wrong in try block"})
        }
    }
    else{
        res.status(404).json({msg:"ID IN PARAMETER NOT FOUND"})
    }
})



//GET TASK BY CUSTOMER ID:-

router.get('/task/customer/:id',async(req,res)=>{
    if (req.params.id){
        const Finding= await Task.find({customer_id:req.params.id}).sort({createdAt:-1})
        if(Finding){
            res.status(200).json(Finding)
        }
        else{
            res.status(404).json({msg:"No Task Assigned By This Customer"})
        }
    }
})

//GET TASK BY CUSTOMER ID:-

router.get('/task/customer/:id',async(req,res)=>{
    if (req.params.id){
        const Finding= await Task.find({customer_id:req.params.id})
        if(Finding){
            res.status(200).json(Finding)
        }
        else{
            res.status(404).json({msg:"No Task Assigned By This Customer"})
        }
    }
})

//GET TASK WHEN TASK IS COMPLETED
router.get('/task/complete',async(req,res)=>{
    const Find = await Task.find({completed:true})
    if(Find){
        res.status(200).json(Find)
    }
})

//GET TASK WHEN TASK IS ASSIGNED
router.get('/task/notassigned',async(req,res)=>{
    const Find = await Task.find({developer_id:[],completed:false})
    if(Find){
        res.status(200).json(Find)
    }
})

//GET TASK WHEN TASK IS  ASSIGNED BUT NOT COMPLETED
router.get('/task/development',async(req,res)=>{
    const Find = await Task.find({developer_id:{ $not: { $size: 0 } },completed:false})
    if(Find){
        res.status(200).json(Find)
    }
})
//DELETE TASK 
router.delete('/task/user/delete/:id',async(req,res)=>{
    if(req.params.id){
        const deleteTask=await Task.findByIdAndDelete(req.params.id)
        if(deleteTask){res.status(200).json({msg:"Task deleted"})}
        else{res.status(400).json({msg:"Task Not Deleted"})}
    }
})
module.exports=router