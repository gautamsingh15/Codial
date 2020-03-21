const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParse=require('cookie-parser');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
  src:'./assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'expanded',
  prefix:'/css'

}));
app.use(express.urlencoded());
app.use(cookieParse());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));



app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
   name:'codeial',
   secret:'blahsomething',
   saveUninitialized:false,
   resave:false,
   cookie: {
       maxAge: ( 1000 * 60 * 100 )
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthentication);
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err)  
    console.log(`Error in running the server:${port} `);

    console.log(`server is running on port ${port}`);
});