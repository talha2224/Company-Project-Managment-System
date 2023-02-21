const connectToMongo = require('./Db/db');
const express = require('express');  
const cors = require('cors');
const dotenv=require('dotenv')
const mongoose=require('mongoose')

const app = express();
const port = process.env.PORT||4000

//DB CONNECTION FUNCTION CALL
connectToMongo();

// CORS RESOLVE
app.use(cors({origin:'*'}));

// DOT-ENV CONFIGUARTION
dotenv.config()

//middle ware.
app.use(express.json());    

//Available Routes

// ADMIN REGISTRATION APIS
app.use('/api/auth', require('./routes/auth'));

// CUSTOMER REGISTRATION APIS
app.use('/api/user',require('./Routes/user'))

// DEVELOPER REGISTRATION APIS
app.use('/api/developer',require('./Routes/developer'))

//MULTER
app.use("/taskimage",express.static('./taskimage'))

//TASK APIS
app.use('/api',require('./Routes/task'))

//RATINGS

app.use('/api',require('./Routes/ratings'))

app.listen(port,console.log(port))