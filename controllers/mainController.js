exports.goToHome=(req,res)=>
{
   res.redirect('/posts');

}

exports.about=(req,res)=>
{
   res.send('about page')
}


exports.contact=(req,res)=>
{
    res.render('./main/contact');
}