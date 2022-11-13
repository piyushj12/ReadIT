const db=require('../config/db');

exports.allPosts=(req,res)=>{
  db.query('select * from post')
  .then(posts=>{
    console.log(posts[0]);
    res.render('./posts', {posts: posts[0]});
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