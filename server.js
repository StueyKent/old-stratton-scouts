const path = require('path');
const StaticRouter = require("./libs/stueyKent/expressServer/staticRouter");

const Middleware = require("./libs/stueyKent/expressServer/middleware");
const Server = require("./libs/stueyKent/expressServer/server");


let middleware = new Middleware();
let staticRouter = new StaticRouter(path.join(__dirname, 'build'), middleware);
let server = new Server(path.join(__dirname, 'build'), [staticRouter]);
server.init();