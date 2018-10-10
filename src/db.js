const mongoose = require('mongoose');
const dbConfig = require('../config.json');
mongoose.connect('mongodb://' + dbConfig.db.host + '/' + dbConfig.db.database);
const db = mongoose.connection;
module.exports = db;