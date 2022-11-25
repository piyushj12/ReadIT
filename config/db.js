const mysql=require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root1234$',
    database: 'blog'
  });


  module.exports=connection;
