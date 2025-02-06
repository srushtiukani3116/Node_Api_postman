const mongoose = require('mongoose');

const RegisterModelSchema = mongoose.Schema({
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
    }
});

const Register = mongoose.model('Register',RegisterModelSchema);
module.exports = Register;