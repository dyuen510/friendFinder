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

app.post('/insert-form', function(req, res){
  res.json(req.body);
    connection.query('INSERT INTO friend (friend_name, picture_link) VALUES (?,?)',
    [req.body.friend_name,req.body.picture_link], function(error, res, fields){
        if (error) res.send(error)
        for (var i =1; i<11; i++){ 
            connection.query('INSERT INTO scores(friends_id, questions_id,answer) VALUES (?,?,?)',
            [res.insertId, [i], req.body['q'+i]], function(error,res,fields){

                if(error) console.log(error);
            })
        }

    })

});




app.listen(3000, function () {
    console.log('listening on 3000');
})