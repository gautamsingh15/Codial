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

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
           
            let postId=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })  
        }
        else{
            Post.findById(comment.post,function(err,post){
                if(post.user==req.user.id){
                    let postId=comment.post;
                    comment.remove();
                    Post.update(postId,{$pull:{comments:req.params.id}},function(err,post1){
                        return res.redirect('back');
                    })  
                }
                else{
                    return res.redirect('back');
                    }
            })
           
        }
    });
}