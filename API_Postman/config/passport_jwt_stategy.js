const passport = require('passport');

const jwtStategy = require('passport-jwt').Strategy;

const ejwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest :  ejwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'API'
}

const Register = require('../models/RegisterModel');

passport.use(new jwtStategy(opts , async function (payload,done) {
    let checkUserData = await Register.findOne({email : payload.userData.email});
    if(checkUserData){
        return done(null,checkUserData);
    }
    else{
        return done(null,false);
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    let userDetails = await Register.findById(id);
    if(userDetails){
        return done(null,userDetails);
    }
    else{
        return done(null,false)
    }
});

module.exports = passport;
