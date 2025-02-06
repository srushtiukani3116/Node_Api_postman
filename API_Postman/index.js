const express = require('express');
const port = 8001;
const app = express();
const db = require('./config/mongoose');

const passport = require('passport');
const jwtStategy = require('./config/passport_jwt_stategy');
const session = require('express-session');

app.use(express.urlencoded());

app.use(session({
    name : 'jwtSession',
    secret : 'Jwt',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Somethig Is Please Try Again",err);
        return false;
    }
    console.log("Server Connected Succefully",port);
});