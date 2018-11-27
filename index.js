
const functions = require('firebase-functions');
const config = require('./config.json');



const app = require('./src/app');


exports.app = functions.https.onRequest(app);