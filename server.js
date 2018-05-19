var express = require('express')
var app = express()
var server = app.listen(4040);

app.use(express.static('public'));
console.log("server running");
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket)
{
    console.log("new user: " + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data)
    {
        socket.broadcast.emit('mouse', data);
        //io.sockets.emit('mouse', data);
        console.log(data);
    }
}