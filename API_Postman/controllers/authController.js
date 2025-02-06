
const Register = require('../models/RegisterModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = async(req,res)=>{
    try{
        let checkData = await Register.find({email : req.body.email}).countDocuments();
        if(checkData==0){
            if(req.body.password == req.body.confirmpass){
                req.body.password = await bcrypt.hash(req.body.password,10);
                let singleUser = await Register.create(req.body);
                if(singleUser){
                    return res.status(200).json({msg : 'User Signup Successfully',data : singleUser});
                }
                else{
                    return res.status(200).json({msg : 'Singleuser Not Found'});
                }
            }
            else{
                return res.status(200).json({msg : 'password And Confirm password are not match'});
            }
        }
        else{
            return res.status(200).json({msg : 'Email alredy exists'});
        }
    }
    catch(err){
        return res.status(400).json({msg : 'Something is Wrong Please Try Again',error : err});
    }
}

module.exports.signin = async(req,res)=>{
    try{
        let checkEmail = await Register.findOne({email : req.body.email});
        if(checkEmail){
            let checkPass = await bcrypt.compare(req.body.password,checkEmail.password);
            if(checkPass){
                let token = await  jwt.sign({userData : checkEmail},'API');   
                return res.status(200).json({msg : 'Login successfully',data : token});
            }
            else{
                return res.status(200).json({msg : 'Invalid Password'});
            }
        }
        else{
            return res.status(200).json({msg : 'Invalid Email'});
        }
    }
    catch(err){
        return res.status(400).json({msg : 'Something is Wrong Please Try Again',error : err});
    }
}