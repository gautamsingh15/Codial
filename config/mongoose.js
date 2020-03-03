const mongoose=require('mongoose');
const db=mongoose.connection;
mongoose.connect('mongodb://localhost/codeial_development');



db.on('error',console.error.bind(console,'error connecting to mongodb database'));

db.once('once',function(){
    console.log('connected to database');
})

module.exports=db;