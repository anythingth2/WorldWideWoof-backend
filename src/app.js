const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db');
const api = require('./routes')
const {
    User
} = require('./models/index');

const app = express();

app.use(cors({
    origin: true
}));

app.use(bodyParser.json());

app.use(session({
    saveUninitialized: false,
    secret: 'ChiChaChai',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use('/api', api);

app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    })
});

app.post('/test', (req, res) => {
    const data = req.body;
    Object.keys(data).forEach((key) => {
        data[key] = 'Back-End Received : ' + data[key];
    });
    res.status(200).json(data);
});

module.exports = app;