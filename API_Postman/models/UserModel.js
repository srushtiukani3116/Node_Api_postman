const mongoose = require('mongoose');

const userModelSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
});

const User = mongoose.model('User',userModelSchema);
module.exports = User;