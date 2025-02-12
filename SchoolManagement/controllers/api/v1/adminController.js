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
        console.log(err);
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

module.exports.adminProfile = async(req,res)=>{
    try {
        return res.status(200).json({msg : 'AdminProfile Find Successfully',UserAdmin : req.user});
    } 
    catch (err) {
        return res.status(400).json({msg : 'Something Is Wrong',error : err});
    }
}

module.exports.editAdminProfile = async(req,res)=>{
    try {
        let checkAdminId = await Admin.findById(req.params.id);
        if(checkAdminId){
            let updateAdminProfile = await Admin.findByIdAndUpdate(req.params.id,req.body);
            if(updateAdminProfile){
                let updateProfile = await Admin.findById(req.params.id);
                return res.status(200).json({msg : 'AdminProfile Updated successfully',Data :updateProfile });
            }
            else{
                return res.status(200).json({msg : 'AdminProfile Not Updated'});
            }
        }
        else{
            return res.status(200).json({msg : 'AdminId Not Found'});
        }
    } 
    catch (err) {
        return res.status(400).json({msg : 'something Is Wrong',error : err});
    }
}

module.exports.changePass = async(req,res)=>{
    try {
        console.log(req.user);
        console.log(req.body);
        let checkCurrentPass = await bcrypt.compare(req.body.currentPass , req.user.password);
        if(checkCurrentPass){
            if(req.body.currentPass != req.body.newPass){
                if(req.body.newPass == req.body.confirmPass){
                    req.body.password = await bcrypt.hash(req.body.newPass,10);
                    let updatedAdminPassword = await Admin.findByIdAndUpdate(req.user._id,req.body);
                    if(updatedAdminPassword){
                        return res.status(200).json({
                            msg:"Admin password changed successfully",
                            data : updatedAdminPassword
                        });
                    }
                    else{
                        return res.status(401).json({msg:"Admin password not changed"});
                    }
                }
                else{
                    return res.status(200).json({msg : 'NewPass Passsword And confirm PassWord Are not Matched'});
                }
            }
            else{
                return res.status(200).json({msg : 'Current Passsword And New PassWord Are not Matched Please Enter valid password'});
            }
        }
        else{
            return res.status(200).json({msg : 'Current Passsword Not Define'});
        }
    }
    catch (err) {
        return res.status(400).json({msg : 'Something Is Wrong Please Try Agian',error : err});
    }
}