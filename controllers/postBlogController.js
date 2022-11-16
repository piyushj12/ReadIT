const db=require('../config/db');

exports.allPosts=(req,res)=>{
  //console.log("The main page req body is", req);
  Promise.all([db.query(' SELECT p.id, p.title, p.description, p.create_date, u.first_name, u.last_name FROM POST as p INNER JOIN USER as u ON p.user_id = u.id'), db.query('SELECT * FROM CATEGORY')])
  .then(result => {
    const [posts, categories] = result
   // console.log(posts[0])
    //console.log(categories[0])
    res.render('./posts', {posts: posts[0], categories: categories[0]})
  })

  // db.query('select * from post')
  // .then(posts=>{
  //   console.log(posts[0]);
  //   res.render('./posts', {posts: posts[0]});
  // //  res.render('index.ejs');
  // }).catch(err=>{
  //   console.log(err);
  // })

}

exports.getPost=(req,res)=>{
  let postId = req.params.id;
  Promise.all([db.query('SELECT p.id,p.title, p.description, p.create_date, u.first_name, u.last_name FROM POST as p INNER JOIN USER as u ON p.user_id = u.id INNER JOIN category c on p.category_id=c.id WHERE p.id='+postId)

,db.query('SELECT c.id, c.comment, c.create_date, u.first_name, u.last_name FROM comment as c INNER JOIN USER as u on c.user_id=u.id WHERE c.post_id='+postId +' '+ 'ORDER BY c.create_date DESC'), 
db.query('SELECT v.id, v.type, v.user_id from vote as v WHERE v.post_id='+postId)])
.then(result => {
  const [post, comments, votes] = result;
  console.log(post[0])
  console.log(comments[0])
  console.log(votes[0])
  res.render('./postDetail', {post:post[0][0], comments: comments[0]})
})
.catch(err=> {
  console.log(err);
})
}

exports.createNewPost = (req, res) => {
  console.log('in create new post');
  db.query('SELECT * FROM CATEGORY')
  .then(categories => {
    res.render('./createBlog.ejs', {categories: categories[0]})
  })
  .catch(err => {
    console.log(err)
  })
  
}

exports.createPost=(req,res)=>{
  console.log(req.body)
    let userID =  parseInt(req.session.user);
    let title = req.body.title;
    let description = req.body.description;
    let categoryId =  parseInt(req.body.category);

    var createPostQuery = `INSERT INTO POST(title,description,user_id,category_id) values("${title}","${description}","${userID}","${categoryId}");`;
    db.query(createPostQuery)
    .then(post=>{
        return res.redirect('/');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.createComment = (req, res) => {
  console.log("Create comment called")
  console.log(req.body);
  let comment = req.body.commentText;
  let postId = parseInt(req.body.post_id);
  let userID = parseInt(req.session.user);
  var createCommentQuery = `INSERT INTO COMMENT(comment, post_id, user_id) values("${comment}", "${postId}", "${userID}");`;
  db.query(createCommentQuery)
  .then(comment => {
    return res.redirect('/posts/'+postId);
  })
  .catch(err => {
    console.log(err);
  })
}

exports.deletePost=(req,res)=>{

}

exports.updatePost=(req,res)=>{
    
}