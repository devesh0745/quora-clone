const Post=require('../models/post');
const Answer=require('../models/answer');
const Comment=require('../models/comments');

module.exports.createPost=async function(req,res){
   try{
    const post=await Post.create({
        content:req.body.content,
        user:req.user._id
    })
    console.log('post created');
    return res.redirect('back');
   }catch(err){
    
    return res.redirect('back');
   } 
}

module.exports.destroyPost=async function(req,res){
    try{
        const post=await Post.findById(req.params.id);
        console.log(post);
        if(post.user.toString()==req.user.id){
            post.deleteOne();
            console.log('post deleted');
            const allAnswers=await Answer.find({post:req.params.id});
            for(let answer of allAnswers){
                await Comment.deleteMany({answer:answer._id});
            }
            await Answer.deleteMany({post:req.params.id});
            console.log('Answer associated with post deleted');
            return res.redirect('back');
        }else{
            console.log('sign-in first');
            return res.redirect('back');
        }
    }catch(err){
        console.log('error',err);
        return res.redirect('back');
    }
}