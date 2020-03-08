const User=require('../models/user');
//render the profile page
module.exports.profile=function(req,res){
  if(req.cookies.user_id){
     User.findById(req.cookies.user_id,function(err,user){
            if(user){
               return res.render('user_profile',{
                  title:"User_Profile",
                  user:user
            });
         }
         else{
            return res.redirect('/users/sign-in');
         }
     });   
  }
  else{
     return res.redirect('/users/sign-in');
  }
}
// render the signup page
module.exports.signUp=function(req,res){
   return res.render('user_sign_up',{
      title:"Codial | SighUp"
  });
}
//render the sigh in page
module.exports.signIn=function(req,res){
   return res.render('user_sign_in',{
      title:"Codial | SighIn"
  });
}

module.exports.create=function(req,res){
 if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
 }
 User.findOne({email:req.body.email},function(err,user){
    if(err){
       console.log('Error in finding user in Signup');
       return;
    }
    if(!user){
       User.create(req.body,function(err,user){
         if(err){
            console.log('Error in Signup');
            return;
         }
         return res.redirect('/users/sign-in');
       });
    }
    else{
      return res.redirect('back');
    }
 })
}

module.exports.createSession=function(req,res){
   User.findOne({email:req.body.email},function(err,user){
      if(err){
         console.log('Error in finding user in Sign-in');
         return;
      }
      if(user){
         if(req.body.password!=user.password){
            return res.redirect('back');
         }
         else{
            res.cookie('user_id',user.id);
            res.redirect('/users/profile');
         }
      }
      else{
        return res.redirect('/users/sign-up');
      }
   });
  
 }