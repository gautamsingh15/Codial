const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){
    try{
            let post=await Post.create({
                content:req.body.content,
                user:req.user._id
            });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message:"post created!"

                });
            }

            req.flash('success','Data posted Successfully');
            return res.redirect('back');
        }catch(err){
            req.flash('error','Error in creating post');
            return res.redirect('back');
   }
}

module.exports.destroy=async function(req,res){
   try{
    let post=await Post.findById(req.params.id)
    if(post.user==req.user.id){
        post.remove();

       await Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
       
    }else{
        return res.redirect('back');
    }

   }catch(err){
       req.flash('error',err);
       return;
   }
   
}