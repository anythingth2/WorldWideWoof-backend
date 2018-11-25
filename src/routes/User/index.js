const User = require('./../../controllers/User');
const Authen = require('./../../controllers/Authen');
const {
    Router
} = require('express');


const router = Router();
// router.get('/:id', User.getUserById);
router.post('/', User.createUser);
router.post('/login',Authen.login);

module.exports = router;