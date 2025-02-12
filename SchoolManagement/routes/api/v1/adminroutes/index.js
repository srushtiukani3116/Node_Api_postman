const express = require('express');

const routes = express.Router();

const AdminClt = require('../../../../controllers/api/v1/adminController');
const passport = require('passport');

routes.post('/adminRegister',AdminClt.adminRegister);

routes.post('/adminLogin',AdminClt.adminLogin);

routes.get('/adminProfile' ,passport.authenticate('jwt',{failureRedirect : '/api/adminFailLogin'}), AdminClt.adminProfile);

routes.get('/adminFailLogin', async(req,res)=>{
    try {
        return res.status(200).json({msg : 'Inavlid Token'})
    } 
    catch (err) {
        return res.status(400).json({msg : 'Something Is Wrong'});
    }
});

routes.put('/editAdminProfile/:id',passport.authenticate('jwt',{failureRedirect : '/api/adminFailLogin'}),AdminClt.editAdminProfile);

routes.get('/adminLogout', async(req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                return res.status(200).json({msg : 'something Is Wrong'});
            }
            else{
                return res.status(200).json({msg : 'Go to Admin Login Page'});
            }
        })
    } 
    catch (err) {
        return res.status(400).json({msg : 'something Is Wrong',error : err});
    }
})

routes.post('/changePass',passport.authenticate('jwt',{failureRedirect : '/api/adminFailLogin'}) , AdminClt.changePass);

module.exports = routes;