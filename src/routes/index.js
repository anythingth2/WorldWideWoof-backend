const {
    Router
} = require('express');
const User = require('./User');
const Authen = require('./Authen');

router = Router();

router.use('/user',User);
router.use('/authen',Authen);
module.exports = router;