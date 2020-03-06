const User=require('../models/user');
module.exports.profile=function(req,res){
   return res.render('user_profile',{
      title:"User_Profile"
  });
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
       user.create(req.body,function(err,user){
         if(err){
            console.log('Error in Signup');
            return;
         }
         return res.redirect('/user/sign-in');
       })
    }
    else{
      return res.redirect('back');
    }
 })
}
module.exports.createSession=function(req,res){
   //todo
  
 }