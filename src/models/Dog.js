const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Breed = require('./Breed');
const dogSchema = Schema({
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


module.exports = mongoose.model('dog', dogSchema, 'dogs');