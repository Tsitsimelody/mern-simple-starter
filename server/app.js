
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');
const config = require('./config/main');

const app = express();
const api_app = express();

const port = 3000;
const api_port = 3050;

// Database Setup
mongoose.connect(config.database);

// Setting up basic middleware for all Express requests
api_app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
api_app.use(bodyParser.json()); // Send JSON responses

// Enable CORS from client-side
api_app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Import routes to be served
router(api_app);

// in development the client app will use webpack, in production express servs static files
// if (process.env.NODE_ENV !== 'production') {
//   const webpackMiddleware = require('webpack-dev-middleware');
//   const webpack = require('webpack');
//   const webpackConfig = require('../webpack.config.js');
//
//   const compiler = webpack(webpackConfig);
//   app.use(webpackMiddleware(compiler, {
//     lazy: true,
//     historyApiFallback: true
//   }));
//   // app.get('*', function (req, res) {
//   //   res.sendFile(path.join(__dirname, '../client/index.html'));
//   // });
//
// } else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
// }

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
