const express = require('express');
const port = 8001;
// const db = require('./config/mongoose');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://srushtiukani3116:jBuBbFC2gDQnfSla@cluster0.hagsw.mongodb.net/SchoolManagement').then(console.log("DB Is Connected")).catch((err)=>{
    console.log("DB Not Connected");
})

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