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
router.post('/:id/uploadImage', 
// multer({
//     // storage: multer.diskStorage({
//     //     destination: (req, file, cb) => {
//     //         console.log(file)
//     //         cb(null, config.uploads.destination + config.uploads.dogImages);
//     //     },
//     //     filename: (req, file, cb) => {
//     //         console.log(file)
//     //         cb(null, 'image_' + req.params.id + '_' + Date.now() + '_' + file.originalname);
//     //     }
//     // })
//     storage: multer.memoryStorage(),
//     limits: {
//         fieldSize: 5 * 1024 * 1024
//     }
// }).single('file'),
Dog.imageParser,
 Dog.uploadDogImage);
router.post('/new', Dog.createDog)
router.put('/:id/update', Dog.updateDog)
router.delete('/:id/del', Dog.deleteDog)
router.post('/breed', Dog.addBreed);


module.exports = router;