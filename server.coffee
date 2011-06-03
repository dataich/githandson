express = require 'express'
io = require 'socket.io'

app = express.createServer()
app.configure ->
  app.use express.methodOverride()
  app.use express.bodyParser()
  app.use express.static __dirname + '/public'

app.get '/', (req, res) ->
  res.sendfile 'views/index.html'

#express.staticが効いてくれないので暫定対応
app.get '/public/*', (req, res) ->
  res.sendfile '.' + req.url

app.listen 8080
socket = io.listen app

socket.on 'connection', (client) ->
  getBodyHTML client
      
  #これをPOSTにしてGitHubのService Hookで叩く
  app.post '/notify', (req, res) ->
    getBodyHTML client, true
    res.end

  client.on 'message', (message) ->
    console.log 'message'

  client.on 'disconnect',  ->
    console.log 'disconnect'

sendToClient = (client, broadcast) ->
  client.send global.body
  client.broadcast global.body if broadcast
  
getBodyHTML = (client, force) ->
  if force is false and global.body?
    sendToClient client, false
  
  options =
    host: 'github.com'
    path: '/dataich/githandson-html/raw/master/index.html'
  
  https = require 'https'
  https.get options, (res) ->
    global.body = ''
    
    res.on 'data', (data) ->
      global.body += data
      console.log data
      
    res.on 'end',  ->
      sendToClient client, true
      
    res.on 'error', (error) ->
      console.log error
    