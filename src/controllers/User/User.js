const User = require('../../models/User')
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
    User.create({
        email: userData.email
    }).then((user) => {
        if (!user) {
            res.status(500).send();
            return;
        }
        res.status(200).json(user);
    });
};
module.exports = {
    getUserById: getUserById,
    createUser: createUser
}