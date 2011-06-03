(function() {
  var audio;
  audio = new Audio('/public/sounds/sound.mp3');
  audio.controls = false;
  audio.autoplay = false;
  audio.preload = 'auto';
  audio.autobuffler = true;
  $(document).ready(function() {
    var socket;
    socket = new io.Socket(null);
    socket.connect();
    return socket.on('message', function(message) {
      audio.play();
      return $('#content').html(message);
    });
  });
}).call(this);
