const express=require('express');

const app=express();
const session=require('express-session');

const userRoutes=require('./routes/userRoutes');
const postBlogRoutes=require('./routes/postBlogRoutes');
// const mysql=require('mysql2/promise');
// const connection=require('./config/db');
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(session({
    secret:'lohfowhfwehfoih',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:60*60*1000},
    // store:new MongoStore({mongoUrl:'mongodb://localhost:27017/trade_sports'})
}))

app.use((req,res,next)=>{
 //   console.log("Session is req", req.session);
     res.locals.user=req.session.user || null;
    next();
})


app.use('/',postBlogRoutes);

app.use('/users',userRoutes);

app.listen(3000,()=>{
    console.log('app is running');
})