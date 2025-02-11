const Admin = require('../../../models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.adminRegister = async(req,res)=>{
    try {
        let adminEmailExist = await Admin.findOne({email : req.body.email});
        if(!adminEmailExist){
            if(req.body.password == req.body.confirmpassword){
                req.body.password = await bcrypt.hash(req.body.password,10);
                let addadmin = await Admin.create(req.body);
                if(addadmin){
                    return res.status(200).json({msg : 'Data Added Successfully',Data : addadmin});
                }
                else{
                    return res.status(200).json({msg : 'Data Not Found'});
                }
            }
            else{
                return res.status(200).json({msg : 'Password And ConfirmPassword Are Not Match'});
            }
        }
        else{
            return res.status(200).json({msg : 'Email Already Exist'});
        }
    } 
    catch (err) {
        return res.status(400).json({msg : 'Something Is Wrong Please Try Agian',error : err});
    }
}

module.exports.adminLogin = async(req,res)=>{
    try {
        let checkAdmin = await Admin.findOne({email : req.body.email});
        if(checkAdmin){
            let checkPass = await bcrypt.compare(req.body.password,checkAdmin.password);
            if(checkPass){
                checkAdmin = checkAdmin.toObject();
                delete checkAdmin.password;
                let adminToken = await jwt.sign({adminData :checkAdmin },'Gopi',{expiresIn : '1D'});
                return res.status(200).json({msg : 'Login SuccessFully',AdminToken : adminToken});
            }
            else{
                return res.status(200).json({msg : 'Invalid Password'});
            }
        }
        else{
            return res.status(200).json({msg : 'Invalid Email'});
        }
    } 
    catch (err) {
        return res.status(400).json({msg : 'Something Is Wrong Please Try Agian',error : err});
    }
}