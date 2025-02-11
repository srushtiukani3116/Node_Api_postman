const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SchoolManagement');

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log("DB Not Connected",err);
        return false;
    }
    console.log("DB is Connected Successfully");
});

module.exports = db;