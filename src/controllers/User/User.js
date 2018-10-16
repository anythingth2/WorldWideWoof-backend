const User = require('../../models/User')
const getUserById = (req, res) => {
    User.findOne({
        id: req.params.id
    }).exec((err, user) => {
        if (err) {
            res.status(500).send();
            return;
        }
        if(user)
        res.status(200).json(user);
        else res.status(404).send();
    });
};
module.exports = {
    getUserById:getUserById,
}