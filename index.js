const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
app.use(cors());
app.use(express.static('public'));
//session 설정
const session = require('express-session');
app.use(
    session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: true,
    }),
);

//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = require('./routes/user');
app.use('/', userRouter);
const reviewRouter = require('./routes/review');
app.use('/', reviewRouter);

app.get('*', (req, res) => {
    //views/404.ejs
    res.render('404');
});

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});
