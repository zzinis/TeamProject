const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
app.use(cors());

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

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});
