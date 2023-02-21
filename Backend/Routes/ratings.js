const router = require('express').Router()
const rating_model=require('../Model/Ratings_Model')

router.post('/rating/post',async(req,res)=>{
    const rating = new rating_model({
        star1: { title: req.body.star1.title, value: req.body.star1.value },
        star2: { title: req.body.star2.title, value: req.body.star2.value },
        star3: { title: req.body.star3.title, value: req.body.star3.value },
        star4: { title: req.body.star4.title, value: req.body.star4.value },
        star5: { title: req.body.star5.title, value: req.body.star5.value },
        star6: { title: req.body.star6.title, value: req.body.star6.value },
        star7: { title: req.body.star7.title, value: req.body.star7.value },
        star8: { title: req.body.star8.title, value: req.body.star8.value }
      });
    
      try {
        await rating.save();
        res.status(201).send(rating);
      } catch (error) {
        console.log(error)
        res.status(400).send(error);
      }
})

router.get('/rating/get',async(req,res)=>{
    try{
        const getRating=await rating_model.find()
        if(getRating){
          res.status(200).json(getRating)
        }
        else{
          res.status(404).json({msg:'no data found'})
        }
    } 
    catch(error){
        console.log(error) 
    }
})

// router.put('/rating/update/star1/:id',async(req,res)=>{
//   try {
    
//     const Update = await rating_model.findByIdAndUpdate(req.params.id,{$set:{star1:req.body}},{new:true})
//     try {
//       if(Update){
//         res.status(200).json(Update)
//       }
      
//     } catch (error) {
//       console.log(error)
//     }
//   } 
//   catch (error) {
//     console.log(error)
//   }
// })

module.exports=router