const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shopSchema = Schema({
    dogs: [{
        type: Schema.Types.ObjectId,
        ref: 'dog'
    }],
    name: String,
    address: String,
    province: String,
    zipcode: Number,
    tel: String,
    license: String,
    lat: Number,
    lng: Number,
    pictures: [String],
    description: String,
    openTime: Date,
    closeTime: Date
});



module.exports = mongoose.model('shop', shopSchema, 'shops');