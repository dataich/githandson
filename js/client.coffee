$(document).ready () ->
  socket = new io.Socket null
  socket.connect()
  
#  socket.on 'connect', ->
#    alert 'connect'
    
  socket.on 'message', (message) ->
    $('#main').html message
    
#  socket.on 'disconnect', ->
#    alert 'disconnect'