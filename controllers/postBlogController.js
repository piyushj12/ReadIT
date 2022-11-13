const db=require('../config/db');

exports.homePage=(req,res)=>{
  db.query('select * from user')
  .then(results=>{
    console.log(results[0]);
    res.send('hello world');
  }).catch(err=>{
    console.log(err);
  })

}

exports.getPost=(req,res)=>{

}

exports.createPost=(req,res)=>{

}

exports.deletePost=(req,res)=>{

}

exports.updatePost=(req,res)=>{
    
}