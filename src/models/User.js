const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Dog = require('./Dog');
const Shop = require('./Shop');
const USER_TYPE = {
    customer: 0,
    dogProvider: 1
}
const userSchema = Schema({
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
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'shop'
    }
});


module.exports = mongoose.model('user', userSchema, 'users');