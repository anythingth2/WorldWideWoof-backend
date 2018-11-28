const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Breed = require('./Breed');
const dogSchema = Schema({
    name: String,
    birthDate: Date,
    breed: {
        type: Schema.Types.ObjectId,
        ref: 'breed'
    },
    dadBreed: {
        type: Schema.Types.ObjectId,
        ref: 'breed'
    },
    momBreed: {
        type: Schema.Types.ObjectId,
        ref: 'breed'
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'shop'
    },
    gender: Number,
    selledDate: Date,
    description: String,
    pictures: [String],
    size: String,
    weight: Number,
    primaryColor: String,
    secondaryColor: String,
    type: Number,
    certificateId: Number,
    sellPrice: Number,
    rentPrice: Number,
    rentStatus: String
});


module.exports = mongoose.model('dog', dogSchema, 'dogs');