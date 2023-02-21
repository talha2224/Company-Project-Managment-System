const mongoose = require('mongoose');  
const dotenv=require('dotenv')   
dotenv.config()

mongoose.set('strictQuery', true);

const connectToMongo = ()=>{
    const success=mongoose.connect(process.env.mongoURI)
    if(!success){
        console.log('database not connected')
    }
}

module.exports = connectToMongo;  