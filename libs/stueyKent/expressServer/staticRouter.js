const express = require('express');
const path = require('path');

class StaticRouter {
  constructor(root, middleware) {
    this._middleware = middleware;
    this._route = '/';
    this._root = root;
    this._router = express.Router();
    this._router.use(this._middleware.call);

    this._router.route('/').post(this.homepage.bind(this));
    this._router.route('/:page').post(this.page.bind(this));
    this._router.route('/:folder/:page').post(this.subPage.bind(this));
    this._router.route('/:folder/:page/*').post(this.pageNotFound.bind(this));

    this._router.route('/').get(this.homepage.bind(this));
    this._router.route('/:page').get(this.page.bind(this));
    this._router.route('/:folder/:page').get(this.subPage.bind(this));
    this._router.route('/:folder/:page/*').get(this.pageNotFound.bind(this));
  }

  homepage(req, res) {
    let filename = 'index';

    let options = {
      root: this._root
    };

    res.sendFile(filename + '.html', options, (err) => {
      if(err) {
        res.status(404).sendFile('404.html', options);
      }
    });
  }

  page(req, res) {
    let filename = req.params.page.replace(/(.html)/g,"");

    let options = {
      root: this._root
    };

    res.sendFile(filename + '.html', options, (err) => {
      if(err) {
        res.status(404).sendFile('404.html', options);
      }
    });
  }

  subPage(req, res) {
    let filename = req.params.page.replace(/(.html)/g,"");

    let options = {
      root: path.join(this._root, req.params.folder)
    };

    res.sendFile(filename + '.html', options, (err) => {
      if(err){
        let options = {
          root: this._root
        };
        res.status(404).sendFile('404.html', options);
      }
    });
  }
  pageNotFound(req, res) {
    let options = {
      root: this._root
    };

    res.status(404).sendFile('404.html', options);
  }

  route() {
    return this._route;
  }

  router() {
    return this._router;
  }
}

module.exports = StaticRouter;