const express = require('express');
const port = 8001;
const db = require('./config/mongoose');

const app = express();

app.use(express.urlencoded());
app.use('/api', require('./routes/api/v1/adminroutes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Something Is Wrong",err);
        return false;
    }
    console.log("Server is Running Successfully",port);
});