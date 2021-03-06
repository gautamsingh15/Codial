const User=require('../models/user');
module.exports.profile=function(req,res){
   User.findById(req.params.id,function(err,user){
      return res.render('user_profile',{
         title:"User_Profile",
         profile_user:user
     });
   })
   
}
// render the signup page
module.exports.signUp=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_up',{
      title:"Codial | SighUp"
  });
}
//render the sigh in page
module.exports.signIn=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
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
   req.flash('success','Logged in Successfully');
   return res.redirect('/');
  
 }
 module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
   return res.redirect('/');
  
 }

 module.exports.update=function(req,res){
   if(req.user.id==req.params.id){
      User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
         return res.redirect('back');
      });
   }else{
      return res.status(401).send('Unauthorized');
   }
 
}