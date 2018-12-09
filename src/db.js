const mongoose = require('mongoose');
const {
    config
} = require('./util');
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.database);
const db = mongoose.connection;

db.once('open', () => {
    console.log('connected wwwoolf database');
});


module.exports = db;