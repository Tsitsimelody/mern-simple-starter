
const express = require('express');
const path = require('path');

const app = express();
const api_app = express();

const port = 3000;
const api_port = 3050;

api_app.get('/hello', (req, res ) => res.send({ hi: 'there'}))

// in development the client app will use webpack, in production express servs static files
if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// todo: configure https
// client server
const server = require('http').createServer(app);

server.listen(port, function() {
    console.log('Client Server Listening on port ' + port);
});

// api server
const api_server = require('http').createServer(api_app);

api_server.listen(api_port, function() {
    console.log('Api server Listening on port ' + api_port);
});
