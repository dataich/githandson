(function() {
  var app, express, getBodyHTML, io, socket;
  express = require('express');
  io = require('socket.io');
  app = express.createServer();
  app.configure(function() {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    return app.use(express.static(__dirname + '/public'));
  });
  app.get('/', function(req, res) {
    return res.sendfile('views/index.html');
  });
  app.get('/public/*', function(req, res) {
    return res.sendfile('.' + req.url);
  });
  app.post('/notify', function(req, res) {
    getBodyHTML(null);
    return res.end;
  });
  app.listen(8080);
  socket = io.listen(app);
  socket.on('connection', function(client) {
    getBodyHTML(client);
    client.on('message', function(message) {
      return console.log('message');
    });
    return client.on('disconnect', function() {
      return console.log('disconnect');
    });
  });
  getBodyHTML = function(client) {
    var https, options;
    if ((client != null) && (global.body != null)) {
      client.send(global.body);
      return;
    }
    options = {
      host: 'raw.github.com',
      path: '/dataich/githandson-html/master/index.html'
    };
    https = require('https');
    return https.get(options, function(res) {
      global.body = '';
      res.on('data', function(data) {
        global.body += data;
        return console.log(data);
      });
      res.on('end', function() {
        return socket.broadcast(global.body);
      });
      return res.on('error', function(error) {
        return console.log(error);
      });
    });
  };
}).call(this);
