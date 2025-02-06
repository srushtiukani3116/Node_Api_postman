const express = require('express');

const routes = express.Router();

const Userclt = require('../controllers/UserController');
const passport = require('passport');

routes.get('/', passport.authenticate('jwt',{failureRedirect : '/unAuth'}) ,Userclt.viewData);

routes.get('/unAuth',async(req,res)=>{
    return res.status(400).json({
        msg : "You Are Unauthorize Please First Login"
    })
});

routes.post('/addData' , passport.authenticate('jwt',{failureRedirect : '/unAuth'}) , Userclt.addData);

routes.delete('/deleteData/:id', passport.authenticate('jwt',{failureRedirect : '/unAuth'}) ,Userclt.deleteData);

routes.get('/singleData', passport.authenticate('jwt',{failureRedirect : '/unAuth'}) ,Userclt.singleData);

routes.put('/updateData/:id', passport.authenticate('jwt',{failureRedirect : '/unAuth'}) ,Userclt.updateData);

routes.use('/auth' , require('./authRoutes'));

module.exports = routes;