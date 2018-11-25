const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const dogSchema = Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: String,
    birthDate: Date,
    breed: Number,
    dadBreed: Number,
    momBreed: Number,
    shopId: Number,
    selledDate: Date,
    description: String,
    pictures: [String],
    size: Number,
    weight: Number,
    primaryColor: Number,
    secondaryColor: Number,
    type: Number,
    certificateId: Number,
    sellPrice: Number,
    rentPrice: Number,
    rentStatus: String
});

dogSchema.plugin(autoIncrement.plugin, {
    model: 'dog',
    field: 'id'
});

module.exports = mongoose.model('dog', dogSchema, 'dogs');