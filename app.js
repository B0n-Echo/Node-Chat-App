const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

server = app.listen(3000, function () {
    console.log('chat app listening on port 3000!')
})

const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.username = 'Anonymous';

    socket.on('change_username', (data) => {
        socket.username = data.username;
        console.log('username changed');
    });

    socket.on('new_message', (data) => {
        // broadcast the new message
        io.sockets.emit('new_message', {message: data.message, username: socket.username});
    });

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    });
});
