const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const dbConfig = require('../config.json');
mongoose.connect('mongodb://' + dbConfig.db.host + '/' + dbConfig.db.database);
const db = mongoose.connection;
autoIncrement.initialize(db);

db.once('open', () => {
    console.log('connected wwwoolf database');
});


module.exports = db;