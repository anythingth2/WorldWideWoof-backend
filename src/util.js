const englishRegex = /^[A-Za-z0-9]*$/;
const config = require('../config.json');
const firebase = require('firebase');
firebase.initializeApp(config.firebase);
module.exports = {
    englishRegex: englishRegex,
    config: config,
    firebase:firebase
}