const Dog = require('./../../controllers/Dog');
const {
    config
} = require('./../../util');
const {
    Router
} = require('express');
const multer = require('multer');
const router = Router();

// router.get('/forSale', Dog.getDogsFS)
// router.get('/forAdopt', Dog.getDogsFA)
router.get('/mockDog',Dog.mockDog);
router.get('/getBreed', Dog.getBreed);
router.get('/dogShop', Dog.getDogShop);
router.get('/', Dog.getDogs);
router.get('/:id', Dog.getDogId);
router.post('/:id/uploadImage',
    Dog.imageParser,
    Dog.uploadDogImage);
router.post('/new', Dog.createDog);
router.put('/:id/update', Dog.updateDog);
router.delete('/:id/del', Dog.deleteDog);
router.post('/breed', Dog.addBreed);





module.exports = router;