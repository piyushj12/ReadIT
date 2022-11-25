const mysql=require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Tamtum@9548k',
    database: 'blog'
  });


  module.exports=connection;
