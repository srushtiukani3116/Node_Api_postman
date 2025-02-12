const passport = require('passport');
const jwtStratagy = require('passport-jwt').Strategy;
const ExtraStratagy = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest : ExtraStratagy.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'Gopi'
}

const Admin = require('../models/AdminModel');

passport.use(new jwtStratagy (opts , async(payload,done)=>{
    let checkAdminData = await Admin.findOne({email : payload.adminData.email});
    if(checkAdminData){
        return done(null , checkAdminData);
    }
    else{
        return done(null,false);
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    const adminData = await Admin.findById(id);
    if(adminData){
        return done(null,adminData);
    }
    else{
        return done(null,false);
    }
})

module.exports = passport;