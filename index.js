const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const userRouter = require('./routes/user');
const reviewRouter = require('./routes/review');
const testRouter = require('./routes/test');
const participation = require('./routes/participation');
const Ask = require('./routes/ask');

const session = require('express-session');
app.use(
    session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: true,
    }),
);

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', userRouter);
app.use('/', reviewRouter);
app.use('/', testRouter);
app.use('/', participation);
app.use('/', Ask);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connect', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    io.emit('notice', `${socket.id}님이 입장하셨습니다`);

    socket.on('join_room', (data) => {
        socket.join(data);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`페이지 :${PORT}`);
});
