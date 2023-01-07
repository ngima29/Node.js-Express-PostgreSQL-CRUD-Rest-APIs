require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./config/dbconnection');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

//port
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

//  routes
app.use('/api',userRoute);
app.use('/api',postRoute);

//server
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})



