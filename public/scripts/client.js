(function() {
  $(document).ready(function() {
    var socket;
    socket = new io.Socket(null);
    socket.connect();
    return socket.on('message', function(message) {
      return $('#content').html(message);
    });
  });
}).call(this);
