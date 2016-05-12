'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
         console.log('A new client has connected')
  		console.log('socket id: ', socket.id);
    });
    
    return io;

};
