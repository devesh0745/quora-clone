const Post=require('../models/post');
const Answer=require('../models/answer');
const Comment=require('../models/comments');


module.exports.createAnswer=async function(req,res){
    try{
    const post=await Post.findById(req.body.post);
    if(post){
        let answer=await Answer.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        });
        post.answers.push(answer);
        post.save();
        console.log('answer created');
        return res.redirect('back');
    }else{
        console.log('Can not find post');
        return res.redirect('back');
    }
    }catch(err){
        console.log('error',err);
        return res.redirect('back');
    }
}

module.exports.detroyAnswer=async function(req,res){
    try{
        
        const answer=await Answer.findById(req.params.id);
        if(answer.user.toString()==req.user.id){
            let postId=answer.post;
            answer.deleteOne();

            const deleteAnswer=await Post.findByIdAndUpdate(postId,{$pull:{answers:req.params.id}});
            await Comment.deleteMany({answer:req.params.id});
            console.log('comments associated with answer deleted');
            return res.redirect('back');
        }else{
            console.log('error');
            return res.redirect('back');
        }
    }catch(err){
        console.log('error',err);
        return res.redirect('back');
    }
}