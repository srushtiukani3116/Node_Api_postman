const User = require('../models/UserModel');

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
        console.log(req.body);
        let userData = await User.create(req.body);
        return res.status(200).json({msg : 'insertData Succesfully',data :userData });

    }
    catch(err){
        return res.status(400).json({msg : 'Something is Wrong',error : err});
    }
}

module.exports.deleteData = async (req,res)=>{
    try{
        console.log(req.params.id);
        let DeleteData = await User.findByIdAndDelete(req.params.id);
        if(DeleteData){
            return res.status(200).json({msg : 'DeleteData Succesfully'});
        }else{
            return res.status(400).json({msg : 'Data Not Found',error : err});
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
        let checkData = await User.findById(req.params.id);
        if(checkData){
            let updateData = await User.findByIdAndUpdate(checkData._id,req.body);
            if(updateData){
                let latestUpdate = await User.findById(updateData._id);
                return res.status(200).json({msg : 'Data Update Successfully',data : latestUpdate});
            }
            else{
                return res.status(200).json({msg : 'UpdateData not Found'});
            }
        }
        else{
            return res.status(200).json({msg : 'CheckData not Found'});
        }
    }
    catch(err){
        return res.status(400).json({msg : 'Something is Wrong',error : err});
    }
}