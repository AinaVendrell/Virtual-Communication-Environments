var WebSocketServer = require('websocket').server
var http = require('http')
var server = http.createServer(function (request, response) {
  // process HTTP request. Since we're writing just WebSockets server, we don't need anything else.
})
server.listen(1337, function () {
  console.log('sencer ready')
}) //here the port is 1337, but this can be changed as you wish

// create the WebSocket Server
wsServer = new WebSocketServer({ httpServer: server })

// Add event handler when one user connects
wsServer.on('request', function (request) {
  console.log('user connected')
  var connection = request.accept(null, request.origin)
  // This is the most important callback for us, we'll handle all messages from users here.
  connection.on('message', function (message) {
    console.log('message', message)
    if (message.type === 'utf8') {
      // process WebSocket message
    }
  })
  connection.on('close', function (connection) {
    // close user connection
  })
})
