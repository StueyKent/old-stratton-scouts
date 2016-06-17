var express        = require( 'express' );
var bodyParser     = require( 'body-parser' );
var methodOverride = require( 'method-override' );
var path = require( 'path' );

var app = express();

var port = process.env.PORT || 3000;

app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }));
app.use( methodOverride( 'X-HTTP-Method-Override' ));
app.use( express.static( __dirname + '/build' ));

app.get( '/', function( req, res) {

    console.log("here")
    var options = {
        root: __dirname
    }
      res.sendFile( path.join('build', 'index.html' ), options);
  });

app.get('/:name', function(req, res) {

    var options = {
        root: __dirname
    }

    var fileName = req.params.name;

    if (fileName.search('.html') === -1) {

        fileName += '.html'
    }

    res.sendFile(path.join('build', fileName ), options, function (err) {
        if (err) {
            console.log(err);
            //res.status(err.status).end();
            res.sendFile( path.join('build', '404.html' ), options);
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});

app.listen( port, function() {
    console.log( 'Running at http://localhost:' + port );
});