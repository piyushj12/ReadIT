const express=require('express');

const app=express();
const session=require('express-session');
var methodOverride = require('method-override')
const userRoutes=require('./routes/userRoutes');
const mainRoutes=require('./routes/mainRoutes');
const postBlogRoutes=require('./routes/postBlogRoutes');
const flash=require('connect-flash');
// const mysql=require('mysql2/promise');
// const connection=require('./config/db');
app.set('view engine','ejs');

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(session({
    secret:'lohfowhfwehfoih',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:60*60*1000},
    // store:new MongoStore({mongoUrl:'mongodb://localhost:27017/trade_sports'})
}))
app.use(flash());
app.use((req,res,next)=>{
 //   console.log("Session is req", req.session);
     res.locals.user=req.session.user || null;
     res.locals.successMessages=req.flash('success');
     res.locals.errorMessages=req.flash('error');
    next();
})


app.use('/',mainRoutes);
app.use('/posts',postBlogRoutes);
app.use('/users',userRoutes);




app.listen(3000,()=>{
    console.log('app is running');
})

app.use((req,res,next)=>{
    console.log('404 error');
    let err=new Error('The server cannot locate'+ req.url);
    err.status=404;
    next(err);
  
})

app.use((err,req,res,next)=>{
    if(!err.status)
    {
        err.status=500;
        err.message=("Internal Server Error");


    }
   
    res.status(err.status);
    res.render('error',{error:err});
})