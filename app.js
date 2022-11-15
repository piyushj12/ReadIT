const express=require('express');

const app=express();

const userRoutes=require('./routes/userRoutes');
const postBlogRoutes=require('./routes/postBlogRoutes');
// const mysql=require('mysql2/promise');
// const connection=require('./config/db');
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


// app.get('/',(req,res)=>{
//     res.send('Hello world');
// })

app.use('/',postBlogRoutes);

app.use('/users',userRoutes);

// connection.connect((req,res,error)=>{
//     if(error)
//     {
//         console.log('error');
//     }
//     else{
//         app.listen(3000, function() {
//             console.log('Listening on port 3000...')
//           })
//     }
// })

app.listen(3000,()=>{
    console.log('app is running');
})