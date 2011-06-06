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
  
#これをPOSTにしてGitHubのService Hookで叩く
app.post '/notify', (req, res) ->
  getBodyHTML null
  res.end

app.listen 8080
socket = io.listen app

socket.on 'connection', (client) ->
  getBodyHTML client

  client.on 'message', (message) ->
    console.log 'message'

  client.on 'disconnect',  ->
    console.log 'disconnect'

getBodyHTML = (client) ->
  if client? and global.body?
    client.send global.body
    return
  
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
      socket.broadcast global.body
      
    res.on 'error', (error) ->
      console.log error
