const {
    Router
} = require('express');
const User = require('./User');
const Dogs = require('./Dogs');
const Shop = require('./Shop');

router = Router();

router.use('/user',User);
router.use('/dog',Dogs);
router.use('/shop',Shop);

module.exports = router;