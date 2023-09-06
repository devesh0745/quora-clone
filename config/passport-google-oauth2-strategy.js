const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

console.log('google auth running');

passport.use(new googleStrategy({

    clientID:'567797715971-bfjpigiqiptp23q2eugrecg8p2nahiji.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:9000/users/auth/google/callback'
},
    async function(accessToken,refreshToken,profile,done){
        try{
            const user=await User.findOne({email:profile.emails[0].value}).exec();
            if(user){
                console.log('profile',profile);
                return done(null,user);
            }
            else{
                const user=await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                })
                if(user){
                    return done(null,user);
                }
                else{
                    console.log('error in creating user',err);
                    return ;
                }
            }
        }
        catch(err){
            console.log('error in google strategy passport',err);
            return;
        }
    }
))