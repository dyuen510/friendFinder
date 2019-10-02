var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());

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

app.get('/insert', function (req, res){
//     res.json(req.query);
// });
    if (req.query.friend_name.length > 1){
        connection.query('INSERT INTO friend (friend_name) VALUES (?)', 
        [req.query.friend_name], function (error,results,fields){
            if (error) res.send(error)
            else res.redirect('/');
        });
    }else{
        res.send('invalid name')
    }
})

app.get('/insert',function (req,res){
//     res.json(req.query);
// })
    if(req.query.picture_link.length > 1){
        connection.query('INSERT INTO friend (picture_link) VALUES (?)',
        [req.query.picture_link], function (error, results, fields){
            if (error) res.send(error)
            else res.redirect('/');
        });
    }else{
        res.send('invalid photo')
    }
})



app.listen(3000, function () {
    console.log('listening on 3000');
})