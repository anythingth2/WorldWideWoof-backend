const Dog = require('./../../controllers/Dog');
const {
    Router
} = require('express');

const router = Router();

router.get('/forSale', Dog.getDogsFS)
router.get('/forAdopt', Dog.getDogsFA)
router.get('/', Dog.getDogs)
router.get('/:id',Dog.getDogId)
router.post('/new',Dog.createDog)
router.put('/:id/update',Dog.updateDog)
router.delete('/:id/del',Dog.deleteDog)

module.exports = router;