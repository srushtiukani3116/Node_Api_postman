const express = require('express');
const port = 8001;
const db = require('./config/mongoose');
const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://srushtiukani3116:jBuBbFC2gDQnfSla@cluster0.hagsw.mongodb.net/SchoolManagement').then(console.log("DB Is Connected")).catch((err)=>{
//     console.log("DB Not Connected",err);
// })

const app = express();

const jwtStratagy = require('./config/passport-jwt-stratagy');
const session = require('express-session');
const passport = require('passport');

app.use(express.urlencoded());
app.use(session({
    name : 'gopi',
    secret : 'SchoolManagment',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*60*60
    }
}));

app.use(passport.session());
app.use(passport.initialize());

app.use('/api', require('./routes/api/v1/adminroutes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Something Is Wrong",err);
        return false;
    }
    console.log("Server is Running Successfully",port);
});