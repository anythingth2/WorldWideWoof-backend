const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('./../../models/User');
const Util = require('./../../util');
const login = (req, res) => {
    const data = req.body;
    if (!('email' in data && 'password' in data)) {
        res.status(400).json({
            msg: 'E-mail or password is missing.'
        });
        return;
    }
    if (!validator.isEmail(data.email)) {
        res.status(400).json({
            msg: 'E-mail is invalid'
        });
        return;
    }
    if (!(Util.englishRegex.test(data.password))) {
        res.status(400).json({
            msg: 'E-mail or password is not english.'
        });
        return;
    }
    User.findOne({
        email: data.email
    }).then((user) => {
        if (user == null) {
            res.status(404).json({
                msg: 'E-mail not found'
            });
            return;
        }
        User.findOne({
            email: data.email
        }).lean().then((user) => {
            bcrypt.compare(data.email + data.password, user.hash).then((b) => {
                if (b) {
                    delete user.hash;
                    console.log(user);
                    req.session.user = user;
                    req.session.save((err) => {
                        res.status(200).json({});
                    });

                } else {
                    res.status(400).json({
                        msg: 'E-mail or password is incorrect.'
                    })
                }
            })
        })
    });
};

const verify = (req, res) => {

    const session = req.session;
    console.log(session);
    const user = session.user;
    if (user != null)
        res.status(200).json({
            result: true
        })
    else
        res.status(404).json({
            result: false
        });
};

module.exports = {
    login: login,
    verify: verify
};