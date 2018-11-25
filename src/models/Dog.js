const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const Breed = require('./Breed');
const dogSchema = Schema({
    id: {
        type: Number,
    },
    name: String,
    birthDate: Date,
    breed: Breed.schema,
    dadBreed: Breed.schema,
    momBreed: Breed.schema,
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'shop'
    },
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

module.exports = {
    Dog: mongoose.model('dog', dogSchema, 'dogs'),
    dogSchema: dogSchema
};