var express = require('express');
var app = express();
var path = require('path');

app.use(express.static("public"));

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'friend_finder'
});

connection.connect();
// app.get('/', function (req,res){
//     res.json(req.query);
// })
app.get('/api/friends', function (req, res){
    connection.query('SELECT * FROM friend', function(error, results, fields){
        if (error) res.send(error)
        else res.json(results);
    });
});

// app.get('insert/:name', function(req, res){
//     connection.query('INSERT INTO friend (friend_name) VALUES (?)', 
//     [req.params.friend_name], function (error, results, fields){
//     if (error) res.send(error)
//     else res.redirect('/');
//     })
// })
// app.get('/insert-form', function(req, res){
//     res.json(req.query);
// })
app.listen(3000,function(){
    console.log('listening on 3000');
})