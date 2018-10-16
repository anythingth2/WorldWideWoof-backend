const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const {
    User
} = require('./models/index');

const app = express();
User.create({
    email: 'test@'
}).then((user) => {
    console.log('created' + user.toString());
});
app.use(bodyParser.json());

app.listen(8080, () => {
    console.log('starting server at 8080')
});