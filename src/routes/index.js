const {
    Router
} = require('express');
const User = require('./User');

router = Router();

router.use('/user',User);
module.exports = router;