const Dog = require('./../../controllers/Dog');
const {
    Router
} = require('express');

const router = Router();

router.get('/forSale', Dog.getDogs)
router.get('/forAdopt', Dog.getDogs)
router.get('/', Dog.getDogs)

module.exports = router;