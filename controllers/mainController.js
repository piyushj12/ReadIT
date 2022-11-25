exports.goToHome=(req,res)=>
{
   res.redirect('/posts');

}

exports.about=(req,res)=>
{
   res.render('./main/about')
}


exports.contact=(req,res)=>
{
    res.render('./main/contact');
}