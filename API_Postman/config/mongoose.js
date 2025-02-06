const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/API_POSTMAN');

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log("Something is Wrong",err);
        return false;
    }
    console.log("DB is Connected");
});

module.exports = db;