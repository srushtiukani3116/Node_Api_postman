const User = require('../models/UserModel');
const path = require('path');
const fs = require('fs');

module.exports.viewData = async (req,res)=>{
    try{
        let viewData = await User.find();
        if(viewData){
            return res.status(200).json({msg : 'Viewdata Succesfully',data : viewData})
        }
        else{
            return res.status(400).json({msg : 'Data not found ',error : err});
        }
    }
    catch(err){
        return res.status(400).json({msg : 'Something is Wrong',error : err});
    }
}

module.exports.addData = async(req,res)=>{
    try{
        var image = '';
        if(req.file){
            image = User.imgpath+'/'+req.file.filename;
        }
        req.body.userImage = image;
        let userData = await User.create(req.body);
        if(userData){
            return res.status(200).json({msg : 'insertData Succesfully',data :userData });
        }
        else{
            return res.status(200).json({msg : 'Data not Addedd'});
        }
    }
    catch(err){
        return res.status(400).json({msg : 'Something is Wrong',error : err});
    }
}

module.exports.deleteData = async (req,res)=>{
    try{
        let userFindData = await User.findById(req.params.id);
        if(userFindData){
            try{
                let imgpath = path.join(__dirname,"..",userFindData.userImage);
                await fs.unlinkSync(imgpath);
            }
            catch(err){
                return res.status(400).json({msg : 'Something is Wrong',error : err});
            }
            let DeleteData = await User.findByIdAndDelete(req.params.id);
            if(DeleteData){
                return res.status(200).json({msg : 'DeleteData Succesfully'});
            }else{
                return res.status(400).json({msg : 'Data Not Found',error : err});
            }
        }
        else{
            return res.status(200).json({msg : 'userData Not Found'});
        }
        
    }
    catch(err){
        return res.status(400).json({msg : 'Something is Wrong',error : err});
    }
}

module.exports.singleData = async(req,res)=>{
    try{
        let singleobj = await User.findById(req.query.dataId);
        if(singleobj){
            return res.status(200).json({msg : 'SingleData Founded Successfully',data : singleobj});
        }
        else{
            return res.status(200).json({msg : 'SingleData not Founded Try Again'});
        }
    }
    catch(err){
        return res.status(400).json({msg : 'Something is Wrong',error : err});
    }
}

module.exports.updateData = async(req,res)=>{
    try{
        let userFindData = await User.findById(req.params.id);
        if(req.file){
            try{
                let deletepath = path.join(__dirname,"..",userFindData.userImage);
                await fs.unlinkSync(deletepath);
            }
            catch(err){
               console.log("Image Not Found");
            }
            let findImage =  User.imgpath+'/'+req.file.filename;
            req.body.userImage = findImage;
        }
        else{
            req.body.userImage = userFindData.userImage;
        }
        let updateData = await User.findByIdAndUpdate(userFindData._id,req.body);
            if(updateData){
                let latestUpdate = await User.findById(updateData._id);
                return res.status(200).json({msg : 'Data Update Successfully',data : latestUpdate});
            }
            else{
                return res.status(200).json({msg : 'UpdateData not Found'});
            }
    }
    catch(err){
        console.log("Something Is Wrong please Try Agian",err);
    }
}