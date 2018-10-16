const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const USER_TYPE = {
    customer: 0,
    dogProvider: 1
}
const userSchema = Schema({
    id: {
        type: Number,
        unique: true,
    },
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
    },
    type: {
        type: Number,
    },
    peopleId: {
        type: Number,
    },
    tel: {
        type: String
    },
    lineId: {
        type: String
    },
    facebookId: {
        type: String
    },
    //for customer
    markDogsId: {
        type: [Number]
    },
    //for dog provider
    shopId: {
        type: Number
    }
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'id'
});

module.exports = mongoose.model('user', userSchema, 'users');