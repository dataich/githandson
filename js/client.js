(function() {
  $(document).ready(function() {
    var socket;
    socket = new io.Socket(null);
    socket.connect();
    return socket.on('message', function(message) {
      return $('#main').html(message);
    });
  });
}).call(this);
