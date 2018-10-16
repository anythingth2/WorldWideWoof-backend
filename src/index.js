const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const api = require('./routes')
const {
    User
} = require('./models/index');

const app = express();

app.use(bodyParser.json());

app.use('/api',api);

app.listen(8080, () => {
    console.log('starting server at 8080')
});