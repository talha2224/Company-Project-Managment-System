const User = require('../Model/UserModel')
const bcrypt=require('bcrypt')
const router = require ('express').Router()
const nodemailer=require('nodemailer')
const excel = require('exceljs')

router.post('/create-user',async(req,res)=>{
    const {name,email,password,developer_id}=req.body
    // CHECKING IF THE USER ALREADY PRESENT
    try{
        let auth=await User.findOne({useremail:email})
        if (auth) {
            return res.status(400).json({success:true, error: "User with this Email already exists" });
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
                html:`<p>Your customer account has been created your email is ${email} and password is ${password} please go to this url and login to your accounnt <a href='http://localhost:3000/user'>Click Here<a/> </p>`
            }

            const hashPassword=await bcrypt.hash(password,10)
            const SaveInfo=await User.create({username:name,useremail:email,password:hashPassword,developer_id:developer_id})
            if(SaveInfo){
                transporter.sendMail(mailOption,(e,info)=>{
                    if(e){
                        console.log(e,'email not sent')
                    }
                    else{
                        console.log('email send'+info.response)
                    }
                })
                return res.status(201).json(SaveInfo)
            }
            else{
                res.status(400).json({msg:"Something Wents Wrong"})
            }
        }

    } 
    catch (error) {
        res.status(500).json({msg:"Internal Server Error"})
    }
})

//LOGIN USER
router.post('/login-user',async(req,res)=>{
    const {email,password}=req.body
    try 
    {
        let auth=await User.findOne({useremail:email})
        if(auth)
        {
            const compare=await bcrypt.compare(password,auth.password)
            if(!compare){
                res.status(400).json({ success:false, error: "Enter correct credentials" });
            }
            else{
                res.status(200).json({username:auth.username,useremail:auth.useremail,userid:auth._id})
            }
        }

        else
        {
            res.status(404).json({msg:"Email Not  Regisitered"})
        }
    }

    catch (error)
    {
        res.status(500).json({msg:"Internal Server Error"})
    }
})

//GET ALL USER
router.get('/getuser',async(req,res)=>{
        try{
           const UserData=await User.find() 
           console.log(UserData)
           if(UserData)
           {res.status(200).json(UserData)}
           else
           {res.status(404).json({msg:"no data found"})}
        } 

        catch(error) {
           res.status(500).json({msg:"server error params not found"}) 
           console.log(error)
        }
    
})
//GET USER BY ID
router.get('/singleuser/:id',async(req,res)=>{
    if(req.params.id)
    {
        try {
           const singleTask=await User.findOne({_id:req.params.id}) 
           if(singleTask){res.status(200).json(singleTask)}
           else{res.status(404).json({msg:"no data found"}) }
        } 
        catch (error) {
           res.status(500).json({msg:"server error params not found"}) 
           console.log(error)
        }
    }
})

//DELETE USER
router.delete('/delete-user/:id',async(req,res)=>{
    if(req.params.id){
        try{
          const Delete= await User.findByIdAndDelete(req.params.id) 
          if(Delete){res.status(200).json({msg:"Customer Deleted Succesfully"})}
          else{res.status(404).json({msg:"no user deleted"})}
        } 


        catch(error) {
            console.log(error)
        }
    }
})

//EXCEL USER DATA DOWNLOAD
router.get('/excel',async(req,res)=>{
    try
    {
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Customer Details');
        worksheet.columns = 
        [
            {header:"S no.", key:"s_no"},
            {header:"Customer Name.", key:"username",width:10},
            {header:"Customer Email", key:"useremail",width:10}
        ];
        let counter = 1;
        const userData=await User.find({})

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
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'Customers_Data.xlsx');
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
    const data = await User.find({})

    if(data){
        res.status(200).json(data)
    }
});

module.exports = router;
