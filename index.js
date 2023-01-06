require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./config/dbconnection');
const userRoute = require('./routes/userRoute');

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

// user route
app.use('/api',userRoute);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})



