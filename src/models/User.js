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
    fullName: String,
    type: Number,
    peopleId: Number,
    tel: String,
    lineId: String,
    facebookId: String,
    //for customer
    markDogsId: [Number],
    //for dog provider
    shopId: Number

});

userSchema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'id'
});

module.exports = mongoose.model('user', userSchema, 'users');