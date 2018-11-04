const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const dogTypeSchema = Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: String,

});

dogTypeSchema.plugin(autoIncrement.plugin, {
    model: 'dogType',
    field: 'id'
});


module.exports = mongoose.model('dogType', dogTypeSchema, 'dogTypes');