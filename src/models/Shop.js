const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const shopSchema = Schema({
    id: {
        type: Number,
        unique: true,
    },
    dogsId: [Number],
    address: String,
    province: String,
    zipcode: Number,
    tel: String,
    license: String,
    lat: Number,
    lng: Number,
    picturesId: [Number],
    description: String,
    openTime: Date,
    closeTime: Date

});

shopSchema.plugin(autoIncrement.plugin, {
    model: 'shop',
    field: 'id'
});

module.exports = mongoose.model('shop',shopSchema,'shops');