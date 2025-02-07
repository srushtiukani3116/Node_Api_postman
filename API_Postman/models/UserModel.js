const mongoose = require('mongoose');

const multer = require('multer');

const imagepath = '/uploads';

const path = require('path');

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
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    userImage : {
        type : String ,
        required : true
    },
    status : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true
});

const storageImage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"..",imagepath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

userModelSchema.statics.UploadImageFile = multer({storage : storageImage}).single('image');
userModelSchema.statics.imgpath = imagepath;

const User = mongoose.model('User',userModelSchema);
module.exports = User;