exports.goToHome=(req,res)=>
{
    res.render('index.ejs');

}

exports.about=(req,res)=>
{
   res.send('about page')
}


exports.contact=(req,res)=>
{
    res.send('contact page');
}