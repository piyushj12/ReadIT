const db=require('../config/db');

exports.allPosts=(req,res)=>{
  db.query('select * from post')
  .then(posts=>{
    console.log(posts[0]);
   // res.render('./posts', {posts: posts[0]});
   res.render('index.ejs');
  }).catch(err=>{
    console.log(err);
  })

}

exports.getPost=(req,res)=>{

}

exports.createPost=(req,res)=>{
    let userID = 2//sessionStorage.getItem('userID')
    let title = req.body.title;
    let description = req.body.description;
    let categoryId =  parseInt(req.body.categoryId);

    var createPostQuery = `INSERT INTO POST(title,description,user_id,category_id) values("${title}","${description}","${userID}","${categoryId}");`;
    db.query(createPostQuery)
    .then(post=>{
        console.log(post)
        console.log('post creation sucess success');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.createNewPost = (req, res) => {

}

exports.deletePost=(req,res)=>{

}

exports.updatePost=(req,res)=>{
    
}