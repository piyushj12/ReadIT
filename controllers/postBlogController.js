const db=require('../config/db');

exports.homePage=(req,res)=>{
    res.render('index.ejs');

  //  db.query('Select * from testtable',(err,results)=>{
  //   if(err)
  //   {
  //       console.log(err);
  //   }
  //   else{
  //       console.log(results);
  //     //  res.send("hello world");
  //   }
  //  });

}

exports.getPost=(req,res)=>{

}

exports.createPost=(req,res)=>{

}

exports.deletePost=(req,res)=>{

}

exports.updatePost=(req,res)=>{
    
}