const {
    Router
} = require('express');
const Authen = require('./../../controllers/Authen');
const router = Router();
router.post('/login', Authen.login);
module.exports = router;