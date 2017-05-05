const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require( 'method-override' );
const path = require('path');

class Server  {
  constructor(root, routers) {
    this._port = process.env.PORT || 8080;
    this._routers = routers;

    this._app = express();
    this._app.use(bodyParser.urlencoded({extended: true}));
    this._app.use( methodOverride( 'X-HTTP-Method-Override' ));
    this._app.use(bodyParser.json());
    this._app.use('/images', express.static(path.join(root, 'images')));
    this._app.use('/css', express.static(path.join(root, 'css')));
    this._app.use('/js', express.static(path.join(root, 'js')));

    console.log(path.join(root, 'images'))

  }

  init(){
    for (let i = 0; i < this._routers.length; i++) {
      let router = this._routers[i];
      this._app.use(router.route(), router.router());
    }

    this._app.listen(this._port);

    console.log('Science happening on port', this._port)
  }
}

module.exports = Server;



