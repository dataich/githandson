(function() {
  var app, express, getBodyHTML, io, sendToClient, socket;
  express = require('express');
  io = require('socket.io');
  app = express.createServer();
  app.configure(function() {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    return app.use(express.static(__dirname + 'js'));
  });
  app.get('/', function(req, res) {
    return res.sendfile('views/index.html');
  });
  app.get('/js/client.js', function(req, res) {
    return res.sendfile('js/client.js');
  });
  app.listen(8080);
  socket = io.listen(app);
  socket.on('connection', function(client) {
    getBodyHTML(client);
    app.post('/notify', function(req, res) {
      getBodyHTML(client, true);
      return res.end;
    });
    client.on('message', function(message) {
      return console.log('message');
    });
    return client.on('disconnect', function() {
      return console.log('disconnect');
    });
  });
  sendToClient = function(client) {
    client.send(global.body);
    return client.broadcast(global.body);
  };
  getBodyHTML = function(client, force) {
    var https, options;
    if (force === false && (global.body != null)) {
      sendToClient(client);
    }
    options = {
      host: 'github.com',
      path: '/dataich/githandson-html/raw/master/index.html'
    };
    https = require('https');
    return https.get(options, function(res) {
      global.body = '';
      res.on('data', function(data) {
        global.body += data;
        return console.log(data);
      });
      res.on('end', function() {
        return sendToClient(client);
      });
      return res.on('error', function(error) {
        return console.log(error);
      });
    });
  };
}).call(this);
