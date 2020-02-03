var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'friend_finder'
});

connection.connect();

app.get('/survey',function(req,res){
    res.sendFile(path.join(__dirname,'survey.html'));
});

app.get('/api/friends', function (req, res) {
    connection.query('SELECT * FROM friend', function (error, results, fields) {
        if (error) res.send(error)
        else res.json(results);
    });
});

//call back function.
app.post('/insert-form', function(req, res){
  res.redirect('/newfriend');
    connection.query('INSERT INTO friend (friend_name, picture_link) VALUES (?,?)', 
    [req.body.friend_name,req.body.picture_link], function(error, res, fields){
        
        if (error) res.send(error)

        for (var i = 1; i<11; i++){ 
            connection.query('INSERT INTO scores(friends_id, questions_id, answer) VALUES (?,?,?)',
            [res.insertId, [i], req.body['q'+i]], function(error,res,fields){
                
                if(error) console.log(error);
            })
        }
    })
    });


    app.get('/newfriend', function(req,res){
        connection.query(`SELECT friend.friend_name,
        SUM(scores.answer)Scoretotal 
        FROM scores  
        INNER JOIN friend ON friend.id = scores.friends_id GROUP BY friend_name`,
        function(error,results,fields){
            if (error) 
            console.log(error);
            res.json(results);
            // var newFriend = connection.query(`SELECT SUM(answer)Scoretotal FROM scores where friends_id = (SELECT MAX(friends_id) FROM scores`),
            // // for(var i =0; i<results.length;i++){
                
            // // }
            // // res.json(results);
        })
    });

    
app.post('/api/friends', function(req,res){
    connection.query('SELECT SUM(answer) FROM scores WHERE friends_id = ?')
})




app.listen(3000, function () {
    console.log('listening on 3000');
})


// 'SELECT SUM(answer_difference) AS difference FROM (SELECT  ABS(answer-t2answer) AS answer_difference FROM (SELECT * FROM scores s1 LEFT JOIN (SELECT questions_id AS t2questions_id, friends_id AS t2friends_id, answer AS t2answer FROM scores s2) t2 ON t2questions_id = s1.questions_id) t3) t4'