const express = require('express');
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