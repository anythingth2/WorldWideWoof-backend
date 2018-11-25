const {
    Router
} = require('express');
const User = require('./User');
const Dogs = require('./Dogs')

router = Router();

router.use('/user', User);
router.use('/dog', Dogs);
module.exports = router;