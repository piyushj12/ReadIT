const db=require('../config/db');

exports.allPosts=(req,res)=>{
  //console.log("The main page req body is", req);
  Promise.all([db.query(' SELECT c.name, p.id, p.title, p.description, p.create_date, u.first_name, u.last_name FROM POST as p INNER JOIN USER as u ON p.user_id = u.id INNER JOIN CATEGORY as c ON c.id=p.category_id'), db.query('SELECT * FROM CATEGORY')])
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
  Promise.all([db.query('SELECT p.id,p.title, p.description,p.user_id, p.create_date, u.first_name, u.last_name FROM POST as p INNER JOIN USER as u ON p.user_id = u.id INNER JOIN category c on p.category_id=c.id WHERE p.id='+postId)

,db.query('SELECT c.id, c.comment, c.create_date, c.user_id,u.first_name, u.last_name FROM comment as c INNER JOIN USER as u on c.user_id=u.id WHERE c.post_id='+postId +' '+ 'ORDER BY c.create_date DESC'), 
db.query('SELECT v.id, v.type, v.user_id from vote as v WHERE v.post_id='+postId)])
.then(result => {
  const [post, comments, votes] = result;
  console.log(post[0])
  console.log(comments[0])
  console.log(votes[0])
  res.render('./postDetail', {post:post[0][0], comments: comments[0],votes:votes[0],upvotes:0,downvotes:0})
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

exports.deleteComment = (req, res) => {
  console.log("Delete coment")
  let commentID = req.body.comment_id;
  let postID = req.body.post_id;
  let deleteCommentQuery = `DELETE FROM COMMENT WHERE id = `+commentID;
  db.query(deleteCommentQuery)
  .then(result => {
    return res.redirect('/posts/'+postID);
  })
  .catch(err => {
    console.log(err);
  })

}



exports.upvote = (req, res) => {
  console.log("in upvote");
  // let comment = req.body.commentText;
  let type=1;
  let postId = parseInt(req.body.post_id);
  let userID = parseInt(req.session.user);
  let upvoteQuery = `INSERT INTO VOTE(type, post_id, user_id) values("${type}", "${postId}", "${userID}");`;
  Promise.all([db.query('DELETE from VOTE WHERE post_id ='+postId+' ' +'AND user_id ='+userID),db.query(upvoteQuery)])
  .then(results=>{
    // const[deleteVoteResult,upVoteResult]=results;
    // console.log(deleteVoteResult[0]);
    // console.log(upVoteResult[0]);
    return res.redirect('/posts/'+postId);
  })
  .catch(err=>{
    console.log(err);
  });

}

exports.downvote = (req, res) => {
  console.log("downvote")
  //console.log(req.body);
  let type = 0;
  let postId = parseInt(req.body.post_id);
  let userID = parseInt(req.session.user);
  var downVoteQuery = `INSERT INTO VOTE(type, post_id, user_id) values("${type}", "${postId}", "${userID}");`;
  Promise.all([db.query('DELETE from VOTE WHERE post_id ='+postId+' ' +'AND user_id ='+userID),db.query(downVoteQuery)])
  .then(results=>{

    // const[deleteVoteResult,downvoteResult]=results;
    // console.log(deleteVoteResult[0]);
    // console.log(downvoteResult[0]);
    return res.redirect('/posts/'+postId);
  })
  .catch(err=>{
    console.log(err);
  });
}

exports.getEditBlog=(req,res)=>{
  let postId = req.params.id;
  // db.query('SELECT p.id,p.title, p.description, p.create_date, u.first_name, u.last_name FROM POST as p INNER JOIN USER as u ON p.user_id = u.id INNER JOIN category c on p.category_id=c.id WHERE p.id='+postId)
  // .then(post=>{
  //   console.log(post[0]);
  //   res.render('./editBlog.ejs',{post:post[0][0]});
  // })
  // .catch(err=>{
  //     console.log(err);
  // });

  const query1='SELECT p.id,p.title,p.description,p.category_id from POST as p INNER JOIN category as c on p.category_id=c.id'
  const query2='SELECT * FROM CATEGORY'

  Promise.all([db.query('SELECT p.id,p.title,p.description,p.category_id from POST as p INNER JOIN category as c on p.category_id=c.id')
    ,db.query('SELECT * from CATEGORY')])
    .then(result=>{
      
      const [post,categories]=result;
      console.log("posts are...."+post[0][0])
      console.log("categories are...."+categories[0][0]);
      res.render('./editBlog.ejs',{post:post[0][0],categories:categories[0]});
      categories
    })
    .catch(err=>{
      console.log(err);
    });
    
}

exports.deletePost=(req,res)=>{
  console.log("Delete post", req.params.id);
  let postID = req.params.id;
  Promise.all([db.query(`DELETE FROM COMMENT WHERE post_id="${postID}"`), db.query(`DELETE FROM VOTE WHERE post_id="${postID}"`)])
  .then(result => {
    db.query(`DELETE FROM POST WHERE id="${postID}"`);
    res.redirect('/posts');
  })
  .catch(err => {
    console.log(err);
  })
}

exports.updateBlog=(req,res)=>{
let postId=req.params.id;
let title=req.body.title;
let description=req.body.description;
let categoryId =  parseInt(req.body.category);
db.query('UPDATE post SET title=? ,description=? ,category_id=? where id=?',[title,description,categoryId,postId])
.then(result=>{
  console.log(result[0])
  return res.redirect('/posts/'+postId);
})
.catch(err=>
  {
    console.log(err);
  })
}