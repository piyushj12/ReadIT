exports.homepage=(req,res)=>{

    res.render('index.ejs')
}

exports.signIn=(req,res)=>{
    res.render('signup.ejs');
}

exports.logIn=(req,res)=>{
   res.render('login.ejs')
}