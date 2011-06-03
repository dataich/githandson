audio = new Audio '/public/sounds/sound.mp3';
audio.controls = false
audio.autoplay = false
audio.preload = 'auto'
audio.autobuffler = true

$(document).ready () ->
  socket = new io.Socket null
  socket.connect()
  
#  socket.on 'connect', ->
#    alert 'connect'
    
  socket.on 'message', (message) ->
    audio.play()
    $('#content').html message
    
#  socket.on 'disconnect', ->
#    alert 'disconnect'