const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const {
    config
} = require('./util');
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.database);
const db = mongoose.connection;
autoIncrement.initialize(db);

db.once('open', () => {
    console.log('connected wwwoolf database');
});


module.exports = db;