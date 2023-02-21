const router = require('express').Router()
const bcrypt=require('bcrypt')
const Developers=require('../Model/Developer_Model')
const nodemailer=require('nodemailer')
const excel = require ('exceljs')

router.post('/create-developer',async(req,res)=>{
    const{name,email,password,customer_id,overall_rating}=req.body
    //CHECK IF EMAIL ALREADY EXITS
    try {
        const auth=await Developers.findOne({developer_email:email})
        if(auth){
            return res.status(400).json({success:false, error: "Admin with this Email already exists" });  
        }
        else{

            const transporter=nodemailer.createTransport({service:"gmail",auth:{
                user:'talhahaider074@gmail.com',
                pass:'lwmhcalesfkafrzp'
            }});

            const mailOption={
                from:'talhahaider074@gmail.com',
                to:email,
                subject:`ACCOUNT CREATION`,
                html:`<p>Dear ${name} your developer account has been created your email is ${email} and password is ${password} please go to this url and login to your accounnt <a href='http://localhost:3000/developer'>Click Here<a/> </p>`
            }

            const hash_password=await bcrypt.hash(password,10)
            const createDev=await Developers.create({developer_name:name,developer_email:email,password:hash_password,customer_id:customer_id,overall_rating:overall_rating})
            if(createDev){
                
                transporter.sendMail(mailOption,(e,info)=>{
                    if(e){
                        console.log(e,'email not sent')
                    }
                })
                return res.status(201).json(createDev)
            }
            else{
                res.status(400).json({msg:"Something Wents Wrong"})
            }
        }
    } 
    catch(error){
        res.status(500).json({msg:"Internal Server Error"})
    }
})


//LOGIN DEVELOPER:-
router.post('/login-developer',async(req,res)=>{
    const {email,password}=req.body

    //check if user present:-
    try 
    {
        const dev_exit=await Developers.findOne({developer_email:email})
        if(!dev_exit){
            res.status(404).json({msg:"Email Not  Regisitered"})
        }
        else{
            const compare_pass=await bcrypt.compare(password,dev_exit.password)
            if(compare_pass){
                res.status(200).json(dev_exit)
            }
            else{
                res.status(400).json({ success:false, error: "Enter correct credentials" });
            }
        }
    } 
    catch (error){
        res.status(500).json({msg:"Internal Server Error"})
        console.log(error)
    }
    
})

//GET DEVELOPER DATA:-
router.get('/get-developer',async(req,res)=>{
    try{
       const getData=await Developers.find()
       if(getData){
        res.status(200).json(getData)
       } 
    } 

    catch(error){
        res.status(500).json({msg:"something wents wrong"})
    }
})

//SINGLE DEVELOPER:-
router.get('/single/:id',async(req,res)=>{
    if(req.params.id){
        try {
            const find=await Developers.findById({_id:req.params.id})
            if(find){
                res.status(200).json(find)
            }
            else{
                res.status(404).json({msg:"your id is not correct"})
            }
        } 
        catch (error) {
            res.status(500).json({msg:"somethings wents wrong"})
        }
    }

    else{
        res.status(400).json({msg:"no dev found id not match"})
    }
})

// UPDATE DEVELOPER:-
router.put('/update-developer/:id',async(req,res)=>{
    if (req.params.id){
        try{
            const updateC=await Developers.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            if(updateC){
                res.status(200).json(updateC)
            }
            else{
                res.json({msg:"error in else in try"})
            }
        } 
        catch (error) {
            console.log(error)
        }
    }
    else{
        console.log('id not present')
    }
})
//DELETE DEVELOPER:-
router.delete('/delete/:id',async(req,res)=>{
    if(req.params.id){
        try{
            const del=await Developers.findByIdAndDelete(req.params.id)
            if(del){res.status(200).json({msg:"deleted success"})}
            else{res.status(500).json({msg:'no data deleted'})}
        } 
        catch(error){
            console.log(error)
        }
    }
    else{
        res.status(404).json({msg:"id not matched"})
    }
})

//DOWNLOAD EXCEL DATA:-
router.get('/excel',async(req,res)=>{
    try
    {
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Developer Details');
        worksheet.columns = 
        [
            {header:"S no.", key:"s_no"},
            {header:"Developer Name.", key:"developer_name",width:10},
            {header:"Developer Email", key:"developer_email",width:10}
        ];
        let counter = 1;
        const userData=await Developers.find({})

        userData.forEach((user)=>{
            user.s_no = counter;
            worksheet.addRow(user)
            counter ++
        });
        worksheet.getRow(1).eachCell((cell)=>{
            cell.font={bold:true};
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
        );
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'Developers_Data.xlsx');
        return workbook.xlsx.write(res).then(()=>{
            res.status(200)
        })
    } 
    catch(error) 
    { 
        console.log(error.message)
    }
})


//PDF DOWNLOAD

router.get('/pdf', async (req, res) => {
    const data = await Developers.find({})

    if(data){
        res.status(200).json(data)
    }
});
module.exports=router