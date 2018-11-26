const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db');
const api = require('./routes')
const methodOverride = require("method-override")
const {
    User
} = require('./models/index');

const app = express();

app.use(cors({
    origin: true
}));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    saveUninitialized: true,
    secret: 'ChiChaChai',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/image', express.static('uploads/dogImages'));
app.use('/api', api);

app.get('/test', (req, res) => {
    res.render('test', {
        name: req.query.name
    });
});

app.post('/test', (req, res) => {
    const data = req.body;
    console.log(data);
    Object.keys(data).forEach((key) => {
        data[key] = 'Back-End Received : ' + data[key];
    });
    res.status(200).json(data);
});

app.use(methodOverride("_method"));

module.exports = app;