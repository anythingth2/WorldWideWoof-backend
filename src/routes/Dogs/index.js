const Dog = require('./../../controllers/Dog');
const Auth = require('./../../controllers/Authen');
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
router.get('/mockDog', Dog.mockDog);
router.get('/getBreed', Dog.getBreed);
router.get('/dogShop', Dog.getDogShop);
router.get('/landing', Dog.getDogsLanding);
router.get('/forSale', Dog.getDogsForSale);
router.get('/:id', Dog.getDogId);
router.use('/', Auth.verify);
router.get('/:id/update',  Dog.fillDogInfo);
router.patch('/:id/update', Dog.updateDog);
router.post('/:id/uploadImage',
    Dog.imageParser,
    Dog.uploadDogImage);
router.post('/new', Dog.createDog);
router.delete('/:id', Dog.deleteDog);
router.post('/breed', Dog.addBreed);





module.exports = router;