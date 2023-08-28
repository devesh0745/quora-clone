const User=require('../models/user');

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Quora'
    })
}
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Quora'
    })
}

module.exports.create=async function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log('not matching')
        return res.redirect('back');
    }
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            const user=await User.create(req.body);
            console.log('user created');
            return res.redirect('/users/sign-in');
        
        }else{
            console.log('Already have an accound....please sign-in');
            return res.redirect('/users/sign-in');
        }

    }catch(err){
        console.log("error in signing up",err);
        return res.redirect('back');

    }
}

module.exports.createSession=async function(req,res){
    console.log('logged in successfuly');
    return res.redirect('/');
} 


module.exports.profile=async function(req,res){
 try{
    const user=await User.findById(req.params.id);
    return res.render('user_profile',{
        title:'Quora',
        profile_user:user
    })
}
catch(err){
    req.flash('error',err);
    return res.redirect('back');
}
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){return next(err); }
        console.log('logging out')
        return res.redirect('/');
    })
}