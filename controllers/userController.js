const db=require('../config/db');

exports.homepage=(req,res)=>{

    res.render('index.ejs')
}

exports.signIn=(req,res)=>{
    //res.render('signup.ejs');
    res.render('./users/signup.ejs');
    
}

exports.handleSignIn=(req,res)=>{
    console.log('controller called');

    let email=req.body.email;
    let password=req.body.password;
    let fname=req.body.first_name;
    let lname=req.body.last_name;
    let bio=req.body.bio;
    const query=`INSERT INTO USER(first_name,last_name,email,password,bio) values("${fname}","${lname}","${email}","${password}","${bio}");`;

    db.query(query)
    .then(results=>{
        console.log('sign up success');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.logIn=(req,res)=>{
   res.render('./users/login.ejs')
}

exports.handleLogIn=(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    db.query('SELECT * from user WHERE email = ? AND password = ?',[email,password])
    .then(results=>{
        if(results[0].length>0)
        {
            res.send('login success');
        }
        else{
          res.send('error');
        }
        
    })
    .catch(err=>{
        console.log(err);
    })
}