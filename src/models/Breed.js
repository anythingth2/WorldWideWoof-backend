const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const breedSchema = Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: String,

});

breedSchema.plugin(autoIncrement.plugin, {
    model: 'breeds',
    field: 'id'
});


module.exports = mongoose.model('breed', breedSchema, 'breeds');