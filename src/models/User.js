const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const Dog = require('./Dog');
const Shop = require('./Shop');
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
    hash: String,
    fullName: String,
    type: Number,
    peopleId: Number,
    tel: String,
    lineId: String,
    facebookId: String,
    //for customer
    markDogs: [{
        type: Schema.Types.ObjectId,
        ref: 'dog'
    }],
    //for dog provider
    shop: Shop.schema
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'id'
});

module.exports = mongoose.model('user', userSchema, 'users');