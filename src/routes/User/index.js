const User = require('./../../controllers/User');
const {
    Router
} = require('express');


const router = Router();
router.get('/:id',User.getUserById );

module.exports = router;