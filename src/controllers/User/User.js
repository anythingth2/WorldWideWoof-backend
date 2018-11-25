const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../../models/User');
const Shop = require('../../models/Shop');
const Util = require('./../../util');

const getUserById = (req, res) => {
    User.findOne({
        id: req.params.id
    }).exec((err, user) => {
        if (err) {
            res.status(500).send();
            return;
        }
        if (user)
            res.status(200).json(user);
        else res.status(404).send();
    });
};
const createUser = (req, res) => {
    const userData = req.body;
    if (!('email' in userData && 'password' in userData)) {
        res.status(400).json({
            msg: 'E-mail or password is missing'
        });
        return;
    }
    if (!validator.isEmail(userData.email)) {
        res.status(400).json({
            msg: 'E-mail is invalid'
        });
        return;
    }
    if (!Util.englishRegex.test(userData.password)) {
        res.status(400).json({
            msg: 'Password is not english'
        });
        return;
    }
    if (!'shopName' in userData) {
        res.status(400).json({
            msg: 'shop name not found'
        });
        return
    }

    User.findOne({
        email: userData.email,
    }).then((user) => {
        if (user == null) {
            bcrypt.hash(userData.email + userData.password, 10).then(async (hash) => {
                var shop = await Shop.create({
                    name: userData.shopName,
                });
                User.create({
                    email: userData.email,
                    hash: hash,
                    shop: shop
                }).then((user) => {
                    if (!user) {
                        res.status(500).send();
                        return;
                    }
                    res.status(200).json({
                        id: user.id,
                        email: user.email
                    });
                });
            });
        } else {
            res.status(400).json({
                msg: 'E-mail already use'
            });
        }
    })
};


module.exports = {
    getUserById: getUserById,
    createUser: createUser
}