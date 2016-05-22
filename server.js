var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

/*
---------
Express
---------
*/

app.enable('trust proxy');
app.use(bodyParser.json());
app.use('/build', router);
app.use(express.static(__dirname + '/build'));

router.get('/', function(req, res, next) {
    var options = {
        root: __dirname
    }
    
    res.sendFile('index.html', options);
});


router.get('/:name', function(req, res, next) {
    
    var options = {
        root: __dirname
    }
    
    var fileName = req.params.name;
    
    if (fileName.search('.html') === -1) {
        
        fileName += '.html'    
    }
    
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});

http.listen(process.env.PORT || 3000, function(){
    console.log('Science happening on *:3000');
});