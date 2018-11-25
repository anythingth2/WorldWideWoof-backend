const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const breedSchema = Schema({
    title: String,
});



module.exports = mongoose.model('breed', breedSchema, 'breeds');