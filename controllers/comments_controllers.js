const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            //console.log(post);
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },function(err,comment){
                if(err){
                   console.log('Error in creating comment');
                   return;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });

        }
        if(err){
           console.log('Post doesnot exits');
           return;
        }
        
    });
   
}