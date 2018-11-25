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
router.get('/', Dog.getDogs)
router.get('/:id', Dog.getDogId)
router.post('/:id/uploadImage', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, config.uploads.destination + config.uploads.dogImages);
        },
        filename: (req, file, cb) => {
            cb(null, 'image_' + req.params.id + '_' + Date.now() + '_' + file.originalname);
        }
    })
}).single('image'), Dog.uploadDogImage);
router.post('/new', Dog.createDog)
router.put('/:id/update', Dog.updateDog)
router.delete('/:id/del', Dog.deleteDog)
router.post('/breed', Dog.addBreed);


module.exports = router;